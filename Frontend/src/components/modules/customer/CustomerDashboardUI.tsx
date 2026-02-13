"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import {
    ShoppingBag, CreditCard, Package, LayoutDashboard, CheckCircle2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Order } from "@/types/order";

interface DashboardProps {
    initialOrders: Order[];
}

export default function CustomerDashboardUI({ initialOrders = [] }: DashboardProps) {
    const { data: session } = authClient.useSession();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const deliveredOrdersCount = initialOrders.filter(
        (order: any) => order.status === "DELIVERED"
    ).length;

    const activeOrdersCount = initialOrders.filter(
        (order: any) => order.status !== "DELIVERED"
    ).length;

    const totalSpent = initialOrders.reduce(
        (sum: number, order: any) => sum + (Number(order.totalAmount) || 0), 0
    );

    const stats = [
        { title: "Total Orders", value: initialOrders.length.toString().padStart(2, '0'), icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-50" },
        { title: "Active Orders", value: activeOrdersCount.toString().padStart(2, '0'), icon: Package, color: "text-orange-600", bg: "bg-orange-50" },
        { title: "Delivered", value: deliveredOrdersCount.toString().padStart(2, '0'), icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
        { title: "Total Spent", value: `${totalSpent.toLocaleString()}৳`, icon: CreditCard, color: "text-purple-600", bg: "bg-purple-50" },
    ];

    return (
        <div className="space-y-8 p-4">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                        <LayoutDashboard className="text-blue-600" />
                        Welcome, {session?.user?.name?.split(' ')[0] || "Customer"}!
                    </h1>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <Card key={index} className="border-none shadow-sm bg-white overflow-hidden">
                        <CardContent className="p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase">{stat.title}</p>
                                    <h3 className="text-xl font-bold text-slate-900 mt-1">{stat.value}</h3>
                                </div>
                                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                    <stat.icon size={20} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="border-none shadow-sm">
                <CardHeader className="border-b border-slate-50">
                    <CardTitle className="text-lg font-bold">Recent History</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="space-y-4">
                        {initialOrders.slice(0, 5).map((order: any) => (
                            <div key={order.id} className="flex items-center justify-between p-2 border-b last:border-0 pb-4">
                                <div className="flex items-center gap-3">
                                    <Package className="text-slate-400" size={18} />
                                    <div>
                                        <p className="text-sm font-bold uppercase">Order #{order.id.slice(-6)}</p>
                                        <p className="text-[10px] text-slate-400" suppressHydrationWarning>
                                            {mounted ? new Date(order.createdAt).toLocaleDateString() : ""}
                                        </p>
                                    </div>
                                </div>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${order.status === "DELIVERED" ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"
                                    }`}>
                                    {order.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}