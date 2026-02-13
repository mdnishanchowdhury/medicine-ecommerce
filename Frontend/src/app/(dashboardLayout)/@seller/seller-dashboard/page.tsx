import { orderService } from '@/services/order.server';
import { cn } from "@/lib/utils";
import {
  DollarSign,
  ShoppingCart,
  PackageCheck,
  Clock,
  TrendingUp,
  ArrowUpRight,
  Truck,
  AlertCircle,
  BarChart3
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SellerDashboardPage() {
  const orderRes = await orderService.getOrderSeller({ cache: "no-store" });

  let allOrders: any[] = [];
  if (orderRes.data) {
    allOrders = Array.isArray(orderRes.data) ? orderRes.data : (orderRes.data.data || []);
  }

  const activeOrders = allOrders.filter(o => {
    const status = o.status?.toUpperCase();
    return status !== 'DELIVERED' && status !== 'CANCELLED';
  });

  const pendingOrders = allOrders.filter(o => o.status?.toUpperCase() === 'PENDING');
  const completedOrders = allOrders.filter(o => o.status?.toUpperCase() === 'DELIVERED');
  const totalRevenue = completedOrders.reduce((acc, curr) => acc + (Number(curr.totalAmount) || 0), 0);
  const potentialRevenue = activeOrders.reduce((acc, curr) => acc + (Number(curr.totalAmount) || 0), 0);

  const stats = [
    {
      title: "Total Earnings",
      value: `$${totalRevenue.toLocaleString()}`,
      description: "From completed sales",
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      trend: "Confirmed",
      isUp: true
    },
    {
      title: "Active Orders",
      value: activeOrders.length.toString(),
      description: "Needs fulfillment",
      icon: ShoppingCart,
      color: "text-blue-600",
      bg: "bg-blue-50",
      trend: `${pendingOrders.length} New`,
      isUp: pendingOrders.length > 0
    },
    {
      title: "Pending Payout",
      value: `$${potentialRevenue.toLocaleString()}`,
      description: "In-progress revenue",
      icon: Clock,
      color: "text-orange-600",
      bg: "bg-orange-50",
      trend: "Upcoming",
      isUp: true
    },
    {
      title: "Fulfillment Rate",
      value: allOrders.length > 0
        ? `${Math.round((completedOrders.length / (allOrders.length - allOrders.filter(o => o.status === 'CANCELLED').length || 1)) * 100)}%`
        : "0%",
      description: "Success ratio",
      icon: PackageCheck,
      color: "text-purple-600",
      bg: "bg-purple-50",
      trend: "Rating",
      isUp: true
    }
  ];

  return (
    <div className="min-h-screen p-6 md:p-10">
      <div className="w-full mx-auto">

        {/* Header */}
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Seller Hub</h1>
            <p className="text-slate-500 font-medium">Manage your pharmacy sales and inventory performance.</p>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
              <BarChart3 size={18} />
              Sales Report
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 rounded-xl text-sm font-bold text-white hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200">
              + Add Medicine
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((item, idx) => (
            <div key={idx} className="bg-white p-7 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <div className={cn("p-4 rounded-2xl", item.bg)}>
                  <item.icon className={cn("size-6", item.color)} />
                </div>
                <div className={cn(
                  "text-[12px] font-black px-2 py-1 rounded-lg",
                  item.isUp ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"
                )}>
                  {item.trend}
                </div>
              </div>
              <p className="text-[15px] font-black text-slate-500 mb-1">{item.title}</p>
              <h3 className="text-3xl font-black text-slate-900 leading-none mb-2">{item.value}</h3>
              <p className="text-xs text-slate-400 font-medium">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white border border-slate-100 rounded-[40px] p-8 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Truck size={22} className="text-indigo-600" />
                Processing Pipeline
              </h2>
              <span className="text-[15px] font-black text-slate-500">Live Status</span>
            </div>

            <div className="space-y-4">
              {
              activeOrders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-5 rounded-[24px] bg-slate-50/50 border border-slate-100 group hover:bg-white hover:border-indigo-100 transition-all">
                  <div className="flex items-center gap-5">
                    <div className="size-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors">
                      <ShoppingCart size={20} />
                    </div>
                    <div>
                      <p className="text-[15px] font-black text-slate-900">#{order.id.slice(0, 8)}</p>
                      <p className="text-[12px] text-slate-400 font-bold ">
                        {order.orderItems?.length || 0} Products • ${order.totalAmount}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border",
                      order.status?.toUpperCase() === 'PENDING' ? "bg-orange-50 text-orange-600 border-orange-100" : "bg-blue-50 text-blue-600 border-blue-100"
                    )}>
                      {order.status}
                    </div>
                    <ArrowUpRight size={18} className="text-slate-300 group-hover:text-indigo-600 transition-colors" />
                  </div>
                </div>
              ))
              }

              {activeOrders.length === 0 && (
                <div className="text-center py-10">
                  <PackageCheck size={40} className="mx-auto text-slate-200 mb-3" />
                  <p className="text-slate-400 font-bold">No active orders to process.</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#0f172a] rounded-[40px] p-10 text-white shadow-2xl">
              <div className="flex items-center gap-3 mb-10">
                <div className="p-2.5 bg-[#6366f1] rounded-xl shadow-lg shadow-indigo-500/20">
                  <AlertCircle size={22} className="text-white" />
                </div>
                <h2 className="text-[25px] font-black ">Seller Alerts</h2>
              </div>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="size-2.5 rounded-full bg-[#f97316] mt-2 shrink-0 shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                  <div>
                    <p className="text-base font-bold text-slate-100">
                      {activeOrders.length.toString()} Orders Pending
                    </p>
                    <p className="text-sm text-slate-400 mt-1 font-medium">
                      Fulfill them soon to maintain rating.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="size-2.5 rounded-full bg-[#6366f1] mt-2 shrink-0 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                  <div>
                    <p className="text-base font-bold text-slate-100">Revenue Growth</p>
                    <p className="text-sm text-slate-400 mt-1 font-medium">
                      Your sales are up 12% from last week.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-800/50">
                <div className="bg-[#1e293b]/50 p-6 rounded-[24px] border border-slate-800/50">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Profile Strength</span>
                    <span className="text-xs font-black text-slate-400">85%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#6366f1] rounded-full shadow-[0_0_10px_rgba(99,102,241,0.4)] transition-all duration-1000"
                      style={{ width: '85%' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#eff6ff] border border-blue-100 rounded-[40px] p-8 shadow-sm">
              <div className="flex items-center gap-3 text-[#4f46e5] mb-4">
                <TrendingUp size={22} strokeWidth={2.5} />
                <span className="text-[15px] font-black">Market Tip</span>
              </div>
              <p className="text-base text-slate-600 font-semibold leading-relaxed">
                Stock up on <span className="text-[#4f46e5]">"Paracetamol"</span> variants. Demand is high in your area this week.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}