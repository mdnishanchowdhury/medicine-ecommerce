"use client";
import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { useRouter, usePathname } from "next/navigation";

export default function OrderButtons({
    medicineId,
    name,
    price,
    image,
    defaultPhone,
    defaultAddress,
    isAuthenticated,
}: any) {
    const [phone, setPhone] = useState(defaultPhone || "");
    const [address, setAddress] = useState(defaultAddress || "");
    const [quantity, setQuantity] = useState(1);

    const router = useRouter();
    const pathname = usePathname();
    const addItem = useCartStore((state: any) => state.addItem);

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            toast.error("Please login to continue");
            return router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
        }
        if (!phone || !address) {
            return toast.error("Please provide both phone and address");
        }
        addItem({
            id: medicineId,
            name,
            price,
            image,
            qty: quantity,
            phoneNumber: phone,
            shippingAddress: address
        });

        toast.success(`${quantity} ${name} added to cart!`);
    };

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="space-y-5">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Shipping Address</label>
                    <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="e.g. House 12, Road 5, Dhanmondi"
                            className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Phone Number</label>
                    <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="017XXXXXXXX"
                            className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4 bg-slate-100 p-2 rounded-2xl w-fit">
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-white shadow-sm" onClick={() => setQuantity(prev => Math.max(1, prev - 1))}>
                    <Minus size={16} />
                </Button>
                <span className="text-lg font-bold w-8 text-center">{quantity}</span>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-white shadow-sm" onClick={() => setQuantity(prev => prev + 1)}>
                    <Plus size={16} />
                </Button>
            </div>

            <Button onClick={handleAddToCart} className="flex-1 h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-lg shadow-blue-200">
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart — Tk {price * quantity}
            </Button>
        </div>
    );
}