import { userService } from "@/services/user.service";
import { orderService } from "@/services/order.server";
import { cn } from "@/lib/utils";
import {
  Users,
  DollarSign,
  ShoppingCart,
  PackageCheck,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Clock,
  LayoutDashboard,
  TrendingUp
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const userRes = await userService.getUsers();
  const orderRes = await orderService.getOrderSeller({ cache: "no-store" });

  const users = userRes?.data || [];
  let allOrders: any[] = [];

  if (orderRes.data) {
    allOrders = Array.isArray(orderRes.data) ? orderRes.data : (orderRes.data.data || []);
  }

  const activeOrdersCount = allOrders.filter(order => order.status !== 'DELIVERED').length;
  const completedOrders = allOrders.filter(order => order.status === 'DELIVERED');
  const cancelledOrders = allOrders.filter(order => order.status === 'CANCELLED');
  const totalRevenue = completedOrders.reduce((acc, curr) => acc + (Number(curr.totalAmount) || 0), 0);

  const stats = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      trend: "+12.5%",
      isUp: true
    },
    {
      title: "Active Users",
      value: users.length.toString(),
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
      trend: "+3.2%",
      isUp: true
    },
    {
      title: "Pending Orders",
      value: `${activeOrdersCount}`,
      icon: Clock,
      color: "text-orange-600",
      bg: "bg-orange-50",
      trend: `${activeOrdersCount} Active`,
      isUp: false
    },
    {
      title: "Completions",
      value: completedOrders.length.toString(),
      icon: PackageCheck,
      color: "text-purple-600",
      bg: "bg-purple-50",
      trend: `${cancelledOrders.length} Cancelled`,
      isUp: true
    }
  ];

  return (
    <div className="min-h-screen p-6 md:p-10">
      <div className="w-full mx-auto">

        {/* Header */}
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-900 rounded-2xl text-white shadow-xl">
              <LayoutDashboard size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Admin Insights</h1>
              <p className="text-slate-500 font-medium">Real-time overview of your pharmacy ecosystem.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-2xl shadow-sm">
            <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[15px] font-black  text-slate-600">System Live</span>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((item, idx) => (
            <div key={idx} className="bg-white p-7 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <div className={cn("p-4 rounded-2xl", item.bg)}>
                  <item.icon className={cn("size-6", item.color)} />
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg",
                  item.isUp ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                )}>
                  {item.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {item.trend}
                </div>
              </div>
              <p className="text-[15px] font-black text-slate-600 mb-1">{item.title}</p>
              <h3 className="text-3xl font-black text-slate-900 leading-none">{item.value}</h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white border border-slate-100 rounded-[40px] p-8 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-black text-slate-900">Latest Transactions</h2>
              <Activity size={20} className="text-slate-300" />
            </div>
            <div className="space-y-4">
              {
                allOrders.slice(0, 6).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-5 rounded-[24px] bg-slate-50/50 border border-slate-100 hover:bg-white hover:border-indigo-100 transition-all group">
                    <div className="flex items-center gap-5">
                      <div className="size-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors">
                        <ShoppingCart size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900">#{order.id.slice(0, 8)}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{order.orderItems?.length || 0} Items</p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-6">
                      <div>
                        <p className="text-base font-black text-slate-900">${order.totalAmount}</p>
                        <div className={cn(
                          "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full inline-block",
                          order.status === 'DELIVERED' ? "bg-emerald-50 text-emerald-600" :
                            order.status === 'CANCELLED' ? "bg-rose-50 text-rose-600" : "bg-orange-50 text-orange-600"
                        )}>
                          {order.status}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-indigo-600 rounded-[40px] p-8 text-white shadow-xl shadow-indigo-200">
              <TrendingUp size={32} className="mb-6 opacity-50" />
              <h3 className="text-lg font-black mb-2 uppercase tracking-tight">Success Rate</h3>
              <div className="text-5xl font-black mb-4">
                {allOrders.length > 0 ? Math.round((completedOrders.length / allOrders.length) * 100) : 0}%
              </div>
              <p className="text-indigo-100 text-sm font-medium leading-relaxed">
                Percentage of orders successfully delivered without cancellation.
              </p>
            </div>

            <div className="bg-slate-900 rounded-[40px] p-8 text-white">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full py-4 bg-slate-800 hover:bg-indigo-500 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all">
                  Manage Users
                </button>
                <button className="w-full py-4 bg-slate-800 hover:bg-indigo-500 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all">
                  Export History
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}