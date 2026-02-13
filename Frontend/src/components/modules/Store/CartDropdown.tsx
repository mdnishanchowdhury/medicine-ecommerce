"use client";
import { useCartStore } from "@/store/useCartStore";
import { ShoppingCart, X, PackageSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { handleOrderAction } from "@/actions/order.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function CartDropdown() {
    const router = useRouter();
    const { items, removeItem, clearCart } = useCartStore() as any;

    const subtotal = items.reduce(
        (sum: number, item: any) => sum + item.price * item.qty,
        0
    );

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-BD", {
            style: "currency",
            currency: "BDT",
        }).format(price);
    };

    const handleCheckout = async () => {
        if (items.length === 0) {
            return toast.error("Your cart is empty!");
        }

        const address = items[0]?.shippingAddress;
        const phone = items[0]?.phoneNumber;

        if (!address || !phone) {
            return toast.error("Shipping address and phone number are required!");
        }

        toast.promise(handleOrderAction(items, address, phone), {
            loading: 'Processing your order...',
            success: (res) => {
                if (res.error) throw new Error(res.error);

                clearCart();
                return "Order placed successfully! Redirecting...";
            },
            error: (err) => {
                return `Order failed: ${err.message}`;
            },
        });
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                    <ShoppingCart className="size-5" />
                    {items.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                            {items.length}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-96 p-5 mr-4 rounded-xl shadow-xl" align="end">
                <h2 className="text-lg font-semibold mb-4 text-slate-800">Shopping Cart</h2>

                {items.length === 0 ? (
                    <div className="py-10 text-center space-y-3">
                        <p className="text-sm text-muted-foreground font-medium">Your cart is empty</p>
                        <Button
                            className="w-full rounded-xl gap-2 font-bold"
                            variant="outline"
                            onClick={() => router.push("/customer-dashboard/myOrders")}
                        >
                            <PackageSearch className="size-4" />
                            View Previous Orders
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                            {items.map((item: any) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-3 border rounded-lg p-2 hover:bg-slate-50 transition"
                                >
                                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border bg-slate-50">
                                        <img
                                            src={item.image || "/api/placeholder/64/64"}
                                            alt={item.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-bold truncate text-slate-800">{item.name}</h4>
                                        <p className="text-[11px] font-medium text-slate-400">Qty: {item.qty}</p>
                                        <p className="text-sm font-bold text-blue-600">{formatPrice(item.price * item.qty)}</p>
                                    </div>

                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="rounded-full size-8 hover:bg-red-50 hover:text-red-500"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        <X className="size-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>

                        <Separator className="bg-slate-100" />

                        <div className="flex justify-between items-center py-2">
                            <span className="text-sm font-bold text-slate-500 uppercase">Total</span>
                            <span className="text-lg font-black text-slate-900">{formatPrice(subtotal)}</span>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Button
                                className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 font-bold h-11"
                                onClick={handleCheckout}
                            >
                                Order Now
                            </Button>

                            <Button
                                variant="outline"
                                className="w-full rounded-xl gap-2 font-bold text-slate-500"
                                onClick={() => router.push("/dashboard/orders")}
                            >
                                <PackageSearch className="size-4" />
                                Order History
                            </Button>
                        </div>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
}