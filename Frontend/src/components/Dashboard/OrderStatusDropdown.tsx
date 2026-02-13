"use client";

import { updateOrderStatusAction } from "@/actions/order.actions";
import { useState } from "react";
import { toast } from "sonner"; 

export function OrderStatusDropdown({ id, currentStatus }: { id: string, currentStatus: string }) {
    const [status, setStatus] = useState(currentStatus);
    const [isPending, setIsPending] = useState(false);

    const handleChange = async (newStatus: string) => {
        setIsPending(true);
        const result = await updateOrderStatusAction(id, newStatus);

        if (result.success) {
            setStatus(newStatus);
            toast.success("Order status updated!");
        } else {
            toast.error(result.error);
        }
        setIsPending(false);
    };

    return (
        <select
            value={status}
            disabled={isPending}
            onChange={(e) => handleChange(e.target.value)}
            className="border rounded px-2 py-1 text-sm bg-white disabled:opacity-50"
        >
            <option value="PLACED">Placed</option>
            <option value="PROCESSING">Processing</option>
            <option value="SHIPPED">Shipped</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
        </select>
    );
}