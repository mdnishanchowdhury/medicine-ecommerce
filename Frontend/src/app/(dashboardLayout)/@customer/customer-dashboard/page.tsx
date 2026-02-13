import CustomerDashboardUI from "@/components/modules/customer/CustomerDashboardUI";
import { orderService } from "@/services/order.server";

export const dynamic = "force-dynamic";

export default async function Page() {
  const response = (await orderService.myOrders()) as any;
  let orders = [];
  if (response && response.data && Array.isArray(response.data)) {
    orders = response.data;
  } else if (Array.isArray(response)) {
    orders = response;
  }

  return (
    <div className="space-y-6">
      <CustomerDashboardUI initialOrders={orders} />
    </div>
  );
}