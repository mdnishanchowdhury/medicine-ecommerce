"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const API_URL = process.env.API_URL || "http://localhost:5000";

export async function createReviewAction(data: {
  medicineId: string;
  orderItemId: string;
  rating: number;
  comment: string;
}) {
  try {
    const cookiesStore = await cookies();

    const res = await fetch(`${API_URL}/api/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: cookiesStore.toString(),
      },
      body: JSON.stringify({
        medicineId: data.medicineId,
        rating: data.rating,
        comment: data.comment
      }),
      cache: "no-store",
    });

    const result = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Review submission failed"
      };
    }

    revalidatePath("/customer-dashboard/myOrders");

    return { success: true, data: result.data };
  } catch (error: any) {
    console.error("Action Error:", error.message);
    return { success: false, message: error.message };
  }
}