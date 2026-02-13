"use server";

import { orderService } from "@/services/order.server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function handleOrderAction(
    items: any[],
    shippingAddress: string,
    phoneNumber: string
) {
    const orderData = {
        shippingAddress: shippingAddress,
        phoneNumber: phoneNumber,
        items: items.map((item: any) => ({
            medicineId: item.id || item._id,
            quantity: item.qty,
            price: Number(item.price),
            sellerId: item.sellerId || "default_seller_id",
        })),
    };

    const res = await orderService.createOrder(orderData);
    if (res.data) {
        revalidateTag('orders', '');
    }

    return res;
}
export async function updateOrderStatusAction(id: string, newStatus: string) {
    try {
        const res = await orderService.updateOrdersStatus(id, { status: newStatus } as any);

        if (res.error) return { success: false, error: res.error.message };

        revalidatePath("/admin-dashboard/customerOrders");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to update" };
    }
}

