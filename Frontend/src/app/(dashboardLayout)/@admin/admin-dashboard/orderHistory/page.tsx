import { orderService } from '@/services/order.server';
import { Order } from '@/types/order';
import { PackageCheck, Building2, MapPin, Phone, XCircle, CheckCircle2 } from 'lucide-react';

export const dynamic = "force-dynamic";

export default async function OrderHistoryPage() {
  let orders: Order[] = [];
  const response = await orderService.getOrderSeller({ cache: "no-store" });

  if (response.data) {
    orders = Array.isArray(response.data) ? response.data : (response.data.data || []);
  }

  const completedOrders = orders.filter(
    order => order.status === 'DELIVERED' || order.status === 'CANCELLED'
  );

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
            <div className="h-8 w-1 bg-slate-400 rounded-full" />
            <h1 className="text-4xl font-black text-black tracking-tight">Order History</h1>
          </div>
          <p className="text-slate-600 font-medium ml-4 uppercase text-xs tracking-widest">
            {completedOrders.length} Completed Transactions
          </p>
        </header>

        <div className="grid gap-8">
          {completedOrders.length > 0 ? (
            completedOrders.map((order) => (
              <div key={order.id} className="group bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm opacity-90 hover:opacity-100 transition-all duration-300">
                <div className="flex flex-col xl:flex-row">

                  <div className="xl:w-80 bg-slate-50/50 p-8 border-b xl:border-b-0 xl:border-r border-slate-100">
                    <div className="space-y-6">
                      <div className="space-y-1">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Reference</span>
                        <h3 className="text-sm font-bold text-slate-600 font-mono">#{order.id.slice(0, 8).toUpperCase()}</h3>
                        <p className="text-[10px] text-slate-400 font-medium">{formatDate(order.createdAt)}</p>
                      </div>

                      <div className={`flex items-center gap-2 p-3 rounded-2xl border ${order.status === 'DELIVERED'
                          ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                          : 'bg-rose-50 border-rose-100 text-rose-600'
                        }`}>
                        {order.status === 'DELIVERED' ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                        <span className="text-xs font-black uppercase tracking-tighter">{order.status}</span>
                      </div>

                      <div className="pt-2">
                        <span className="text-[11px] font-bold text-slate-400 uppercase">Revenue</span>
                        <p className="text-2xl font-black text-slate-900">${order.totalAmount}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 p-8">
                    <div className="grid gap-4">
                      {order.orderItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 p-3 rounded-xl bg-slate-50/50 border border-slate-100">
                          <img src={item.medicine.image} alt="med" className="h-12 w-12 rounded-lg object-cover grayscale-[0.5]" />
                          <div className="flex-1">
                            <h4 className="text-sm font-bold text-slate-800 capitalize">{item.medicine.name}</h4>
                            <p className="text-[10px] font-medium text-slate-400">Qty: {item.quantity} × ${item.price}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-black text-slate-700">${item.price * item.quantity}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="xl:w-96 p-8 flex flex-col justify-center border-t xl:border-t-0 xl:border-l border-slate-100">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-slate-500">
                        <MapPin size={16} className="shrink-0" />
                        <span className="text-xs font-medium truncate">{order.shippingAddress || "No Address Provided"}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-500">
                        <Phone size={16} className="shrink-0" />
                        <span className="text-xs font-medium">{order.phoneNumber || "No Contact"}</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-40 bg-white border-2 border-dashed border-slate-200 rounded-[48px]">
              <PackageCheck size={64} className="text-slate-200 mb-6" />
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">No History Found</h3>
              <p className="text-slate-400 font-medium">Completed or cancelled orders will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}