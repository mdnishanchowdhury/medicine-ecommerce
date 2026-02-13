import { Badge } from "@/components/ui/badge";
import { mediService } from "@/services/medi.server";
import { Medicine } from "@/types/medi.service";
export const dynamic = "force-dynamic";
import {
    Building2,
    Star,
    CheckCircle2,
    ShieldCheck
} from "lucide-react";
import OrderButtons from "../OrderButtons";
import { userService } from "@/services/user.service";
import ReviewFormModal from "@/components/layout/ReviewFormModal";

export default async function MedicinePage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const { data: medicineResponse } = await mediService.getMedicinesById(id);
    const medi: Medicine = medicineResponse.data;

    const { data: session } = await userService.getSession();
    const sellerId = session?.user?.id;
    const isAuthenticated = !!session;

    const { data: usersResponse } = await userService.getUsers();
    const allUsers = Array.isArray(usersResponse?.data) ? usersResponse.data : (Array.isArray(usersResponse) ? usersResponse : []);

    const reviewersDetails = medi?.reviews?.map((review: any) => {
        const matchedUser = allUsers.find((user: any) => user.id === review.customerId);
        return {
            ...review,
            userInfo: matchedUser || { name: "Verified User", image: null }
        };
    }) || [];

    const avgRating = medi.reviews?.length
        ? (medi.reviews.reduce((acc, curr) => acc + curr.rating, 0) / medi.reviews.length).toFixed(1)
        : "0.0";

    return (
        <div className="w-full max-w-7xl mx-auto mb-10 pt-24 px-4">
            <div className="bg-white dark:bg-zinc-950 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden border border-slate-100 dark:border-zinc-800">
                <div className="flex flex-col lg:flex-row">

                    <div className="lg:w-1/2 bg-[#f8fafc] dark:bg-zinc-900 p-6 md:p-12 flex items-center justify-center relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl -mr-20 -mt-20"></div>
                        <div className="w-full h-full max-w-md relative group">
                            <img
                                src={medi.image}
                                alt={medi.name}
                                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                    </div>

                    {/* Right Side: Details */}
                    <div className="lg:w-1/2 p-8 md:p-14 flex flex-col gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Badge className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-1 rounded-full text-[10px] font-bold uppercase">
                                    {medi.category?.categoryName || "Medicine"}
                                </Badge>
                                <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50/50 px-4 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                                    In Stock
                                </Badge>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                {medi.name}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-slate-500 pt-2">
                                <div className="flex items-center gap-2.5">
                                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Building2 size={18} /></div>
                                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{medi.manufacturer}</span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><ShieldCheck size={18} /></div>
                                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Certified</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-slate-400 font-bold text-[11px] uppercase tracking-[0.2em]">Product Overview</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
                                {medi.description || "Premium pharmaceutical grade product."}
                            </p>
                        </div>

                        <div className="bg-slate-900 rounded-[1.5rem] p-8 flex items-center justify-between text-white shadow-xl">
                            <div>
                                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Total Price</p>
                                <h2 className="text-4xl font-bold">৳{medi.price}</h2>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold">{medi.stock}</p>
                                <p className="text-slate-400 text-[10px] uppercase font-bold">Units Left</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <OrderButtons
                                medicineId={medi.id}
                                name={medi.name}
                                price={medi.price}
                                image={medi.image}
                                isAuthenticated={isAuthenticated}
                                sellerId={sellerId}
                            />
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-50 dark:border-zinc-800 bg-slate-50/30 dark:bg-zinc-900/30 p-8 md:p-14">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                        <div className="lg:col-span-1 space-y-6">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">User Experience</h3>
                            <div className="flex items-center gap-2">
                                <div className="flex gap-0.5">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star key={s} size={18} className={s <= Math.round(Number(avgRating)) ? "fill-amber-400 text-amber-400" : "text-slate-300"} />
                                    ))}
                                </div>
                                <span className="text-lg font-bold ml-2">{avgRating} / 5.0</span>
                            </div>
                            <p className="text-slate-500 text-sm">Based on {medi.reviews?.length || 0} reviews.</p>
                        </div>

                        <div className="lg:col-span-2 space-y-8">
                            <div className="space-y-4 max-h-112.5 overflow-y-auto pr-4 custom-scrollbar py-5">
                                {
                                    reviewersDetails.length > 0 ? (
                                        reviewersDetails.map((review: any) => (
                                            <div key={review.id} className="p-6 rounded-[1.5rem] bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 shadow-sm space-y-4">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden">
                                                            <img
                                                                src={review.userInfo?.image}
                                                                alt="image"
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-1.5">
                                                                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{review.userInfo?.name}</span>
                                                                <CheckCircle2 size={14} className="text-blue-500" />
                                                            </div>
                                                            <div className="flex gap-0.5">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <Star key={i} size={10} className={i < review.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"} />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span className="text-[11px] text-slate-400">
                                                        {new Date(review.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                                    "{review.comment}"
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-10 text-slate-400 italic">No reviews yet.</div>
                                    )
                                }
                            </div>

                            <ReviewFormModal
                                medicineId={medi.id}
                            />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}