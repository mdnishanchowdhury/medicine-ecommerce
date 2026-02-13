import { OrderStatusDropdown } from '@/components/Dashboard/OrderStatusDropdown';
import { orderService } from '@/services/order.server';
import { Order } from '@/types/order';
import { Package, Building2, MapPin, Phone } from 'lucide-react';

export const dynamic = "force-dynamic";

export default async function CustomerOrdersPage() {
    let orders: Order[] = [];
    const response = await orderService.getOrderSeller({ cache: "no-store" });

    if (response.data) {
        orders = Array.isArray(response.data) ? response.data : (response.data.data || []);
    }

    const activeOrders = orders.filter(order => order.status !== 'DELIVERED');

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen p-4 md:p-8 lg:p-12 bg-slate-50/30">
            <div className="w-full mx-auto">
                <header className="mb-12">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-8 w-1 bg-indigo-600 rounded-full" />
                        <h1 className="text-4xl font-black text-black tracking-tight">Active Orders</h1>
                    </div>
                    <p className="text-slate-600 font-medium ml-4 text-[15px]">
                        {activeOrders.length} Pending Fulfilments
                    </p>
                </header>

                <div className="grid gap-10">
                    {activeOrders.length > 0 ? (
                        activeOrders.map((order) => (
                            <div key={order.id} className="group bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-500">
                                <div className="flex flex-col xl:flex-row">

                                    <div className="xl:w-96 bg-slate-50/50 p-8 border-b xl:border-b-0 xl:border-r border-slate-100">
                                        <div className="space-y-8">
                                            <div className="flex justify-between items-start">
                                                <div className="space-y-1">
                                                    <span className="text-[15px] font-black text-slate-500">Order ID</span>
                                                    <h3 className="text-sm font-black text-indigo-600 font-mono">#{order.id.slice(0, 8)}</h3>
                                                </div>
                                                <span className="bg-white border border-slate-200 text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm text-black">
                                                    {formatDate(order.createdAt)}
                                                </span>
                                            </div>

                                            <div className="space-y-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                                                <div className="flex items-start gap-3">
                                                    <div className="mt-1 p-1.5 bg-orange-50 rounded-lg text-orange-600">
                                                        <MapPin size={16} />
                                                    </div>
                                                    <div>
                                                        <span className="text-[13px] font-bold text-slate-500">Destination</span>
                                                        <p className="text-sm font-bold text-slate-800 leading-tight mt-0.5 capitalize">{order.shippingAddress || "N/A"}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-3">
                                                    <div className="mt-1 p-1.5 bg-blue-50 rounded-lg text-blue-600">
                                                        <Phone size={16} />
                                                    </div>
                                                    <div>
                                                        <span className="text-[13px] font-bold text-slate-500">Contact</span>
                                                        <p className="text-sm font-bold text-slate-800 mt-0.5">{order.phoneNumber || "N/A"}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between px-2 pt-2">
                                                <div className="flex flex-col">
                                                    <span className="text-[13px] font-bold text-slate-500 ">Total Revenue</span>
                                                    <span className="text-2xl font-black text-slate-900">${order.totalAmount}</span>
                                                </div>
                                                <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1 p-8">
                                        <div className="flex items-center justify-between mb-8">
                                            <span className="text-[15px] font-bold text-slate-500">Medicine Details</span>
                                            <span className="h-px flex-1 bg-slate-100 mx-4" />
                                        </div>

                                        <div className="grid gap-6">
                                            {order.orderItems.map((item) => (
                                                <div key={item.id} className="flex items-center gap-6 p-4 rounded-2xl bg-white border border-slate-50 hover:border-indigo-100 transition-colors shadow-sm">
                                                    <div className="relative h-16 w-16 rounded-xl overflow-hidden shadow-inner shrink-0 bg-slate-100">
                                                        <img src={item.medicine.image} alt="image" className="object-cover h-full w-full" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <h4 className="text-lg font-black text-slate-800 capitalize leading-none">{item.medicine.name}</h4>
                                                                <p className="text-xs font-bold text-slate-400 mt-1 flex items-center gap-1">
                                                                    <Building2 size={12} /> {(item.medicine as any).manufacturer}
                                                                </p>
                                                            </div>
                                                            <div className="text-right">
                                                                <span className="block text-lg font-black text-slate-900">${item.price * item.quantity}</span>
                                                                <span className="text-xs font-bold text-slate-400">${item.price}/unit</span>
                                                            </div>
                                                        </div>
                                                        <div className="mt-3 flex items-center gap-2">
                                                            <span className="text-[10px] font-black bg-indigo-50 text-indigo-600 border border-indigo-100 px-2 py-0.5 rounded-md">
                                                                QTY: {item.quantity}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="xl:w-80 p-8 bg-slate-50/30 flex flex-col justify-center border-t xl:border-t-0 xl:border-l border-slate-100">
                                        <div className="space-y-6">
                                            <div className="text-center p-6 bg-white rounded-[24px] border border-slate-100 shadow-sm">
                                                <span className="text-[15px] font-bold text-slate-500 block mb-3">Live Status</span>
                                                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest bg-indigo-50 text-indigo-600 border border-indigo-100">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
                                                    {order.status}
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <label className="text-[15px] font-black text-slate-800 block text-center">Update Progress</label>
                                                <div className="relative group/dropdown">
                                                    <OrderStatusDropdown id={order.id} currentStatus={order.status} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-40 bg-white border-2 border-dashed border-slate-200 rounded-[48px]">
                            <Package size={64} className="text-slate-200 mb-6" />
                            <h3 className="text-2xl font-black text-slate-800 tracking-tight">All Caught Up!</h3>
                            <p className="text-slate-400 font-medium">No pending orders to display.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}