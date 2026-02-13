import { orderService } from "@/services/order.server";
import { Order } from "@/types/order";
import OrderTrackingVisual from "@/components/layout/OrderTrackingVisual";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
    const orders: Order[] = await orderService.myOrders();

    const activeOrders = orders.filter(
        (order) => order.status !== "DELIVERED" && order.status !== "COMPLETED"
    );

    return (
        <div className="p-6 space-y-10 bg-gray-50 min-h-screen container mx-auto px-4">
            <div>
                <h1 className="text-3xl font-bold mb-2">My Orders</h1>
                <p className="text-gray-500 text-sm">Manage your recent orders and feedback.</p>
            </div>

            <section>
                <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Active Orders</h2>
                    <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded-full font-bold">
                        {activeOrders.length}
                    </span>
                </div>

                {activeOrders.length === 0 ? (
                    <div className="bg-white p-8 rounded-xl border border-dashed text-center text-gray-400">
                        No ongoing orders at the moment.
                    </div>
                ) : (
                    <div className="w-full space-y-6">
                        {activeOrders.map((order) => (
                            <OrderCard key={order.id} order={order} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

function OrderCard({ order }: { order: Order }) {
    return (
        <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col justify-between border-t-4 border-indigo-500 transition-all">
            <div>
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Order ID</p>
                        <p className="text-sm font-mono text-gray-600">#{order.id.slice(0, 8)}</p>
                    </div>
                    <span className="px-2.5 py-1 text-xs rounded-full font-bold uppercase bg-blue-100 text-blue-700">
                        {order.status}
                    </span>
                </div>

                <div className="space-y-3 mb-1">
                    {order.orderItems.map((item: any) => (
                        <div key={item.id} className="flex flex-col p-3 rounded-lg border border-gray-100 bg-gray-50/50">
                            <div className="flex items-center gap-3">
                                <img
                                    src={item.medicine.image}
                                    alt=""
                                    className="w-12 h-12 object-cover rounded-md bg-white border"
                                />
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-gray-800">{item.medicine.name}</p>
                                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-auto">
                <div className="flex justify-between items-center mb-4 px-1 border-b pb-2 border-gray-50">
                    <p className="text-sm font-medium text-gray-500">Total Paid</p>
                    <p className="text-lg font-bold text-gray-900">${order.totalAmount}</p>
                </div>
                <OrderTrackingVisual currentStatus={order.status as any} />
            </div>
        </div>
    );
}
