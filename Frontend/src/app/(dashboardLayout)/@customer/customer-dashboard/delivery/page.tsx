import { orderService } from "@/services/order.server";
import DeliveryCard from "@/components/modules/customer/DeliveryCard";

export const dynamic = "force-dynamic";

export default async function DeliveryPage() {
  const response = (await orderService.myOrders()) as any;

  const orders = response?.data || (Array.isArray(response) ? response : []);

  return (
    <div className="min-h-screen bg-slate-50/50">
      <DeliveryCard initialOrders={orders} />
    </div>
  );
}