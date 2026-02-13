"use client";

import { Check, Package, Truck, Home, Clock, XCircle } from "lucide-react";
type OrderStatus = "PLACED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "COMPLETED" | "CANCELLED";

const steps: {
  status: string;
  label: string;
  icon: any;
}[] = [
    { status: "PLACED", label: "Order Placed", icon: Clock },
    { status: "PROCESSING", label: "Processing", icon: Package },
    { status: "SHIPPED", label: "Shipped", icon: Truck },
    { status: "DELIVERED", label: "Delivered", icon: Home },
  ];

export default function OrderTrackingVisual({ currentStatus }: { currentStatus: OrderStatus }) {
  if (currentStatus === "CANCELLED") {
    return (
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
          <XCircle size={32} />
        </div>
        <h3 className="text-lg font-bold text-red-600">Order Cancelled</h3>
      </div>
    );
  }

  const effectiveStatus = currentStatus === "COMPLETED" ? "DELIVERED" : currentStatus;

  const currentIndex = steps.findIndex((step) => step.status === effectiveStatus);
  const isAllDone = currentStatus === "DELIVERED" || currentStatus === "COMPLETED";

  return (
    <div>
      <div className="relative flex justify-between">
        <div className="absolute top-5 left-0 w-full h-1 bg-slate-100 -z-10" />
        <div
          className="absolute top-5 left-0 h-1 bg-blue-600 transition-all duration-700 -z-10"
          style={{ width: `${(Math.max(0, currentIndex) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, index) => {
          const isCompleted = index < currentIndex || isAllDone;
          const isCurrent = index === currentIndex && !isAllDone;
          const Icon = step.icon;

          return (
            <div key={step.status} className="flex flex-col items-center flex-1">
              <div className={`w-11 h-11 rounded-full flex items-center justify-center border-4 transition-all duration-300
                ${isCompleted || isCurrent ? "bg-blue-600 border-blue-200 text-white" : "bg-white border-slate-200 text-slate-300"}
              `}>
                {isCompleted ? <Check size={18} /> : <Icon size={18} />}
              </div>
              <p className={`mt-3 text-xs font-semibold ${isCompleted || isCurrent ? "text-blue-700" : "text-slate-400"}`}>
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}