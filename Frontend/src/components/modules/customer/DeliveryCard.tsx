"use client";

import { useState, useEffect, useMemo } from "react";
import { Package, ChevronRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import OrderTrackingVisual from "@/components/layout/OrderTrackingVisual";

interface DashboardProps {
  initialOrders: any[];
}

export default function DeliveryCard({ initialOrders = [] }: DashboardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const deliveredOrders = useMemo(() => {
    if (!Array.isArray(initialOrders)) return [];
    return initialOrders.filter(
      (order: any) => order.status?.toUpperCase() === "DELIVERED"
    );
  }, [initialOrders]);

  const totalItemsToReview = useMemo(() => {
    return deliveredOrders.reduce((acc, order) => {
      const unreviewedInOrder = order.orderItems.filter((item: any) => !item.review).length;
      return acc + unreviewedInOrder;
    }, 0);
  }, [deliveredOrders]);

  if (!mounted) return null;

  return (
    <div className="p-4 space-y-6 min-h-screen w-full mx-auto">
      <div className="flex items-center justify-between mb-6 px-2">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <Package size={20} />
          </div>
          <h2 className="text-xl font-black text-gray-800 tracking-tight">Pending Reviews</h2>
        </div>
        <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
          {totalItemsToReview} {totalItemsToReview === 1 ? 'Item' : 'Items'}
        </div>
      </div>

      {deliveredOrders.length > 0 && totalItemsToReview > 0 ? (
        deliveredOrders.map((order: any) =>
          order.orderItems.map((item: any) => {
            if (item.review) return null;

            return (
              <div
                key={item.id}
                className="w-full bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 relative"
              >
                <div className="h-1.5 w-full bg-blue-600"></div>

                <div className="p-5 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                        ORDER ID
                      </p>
                      <p className="text-sm font-mono font-bold text-gray-700">
                        #{order.id.slice(-8).toLowerCase()}
                      </p>
                    </div>
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider">
                      {order.status}
                    </span>
                  </div>

                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 mb-4 flex items-center gap-4">
                    <div className="w-14 h-14 bg-white rounded-lg border border-gray-100 p-1 shrink-0">
                      <img
                        src={item.medicine.image}
                        alt={item.medicine.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-gray-800 line-clamp-1">
                        {item.medicine.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  <div className="py-2">
                    <OrderTrackingVisual currentStatus={order.status as any} />
                  </div>

                  <Link href={`/medicine/${item.medicineId}`} className="block mt-4">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 group tracking-widest">
                      WRITE A REVIEW
                      <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </div>
            );
          })
        )
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
          <ShoppingBag className="mx-auto text-gray-300 mb-4" size={48} />
          <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No items to review</p>
        </div>
      )}
    </div>
  );
}