import { Order, OrderItem } from "@/types/order";
import { cookies } from "next/headers";
const API_URL = process.env.API_URL;
interface GetMedicinesParams {
    page?: number;
    limit?: number;
    status?: string;
    [key: string]: any;
}
interface ServiceOptions {
    cache?: RequestCache;
    revalidate?: number;
}

export const orderService = {
    createOrder: async function (orderData: any) {
        try {
            const cookiesStore = await cookies();

            const res = await fetch(`${API_URL}/api/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    cookie: cookiesStore.toString(),
                },
                body: JSON.stringify(orderData),
                cache: "no-store",
            });

            const responseText = await res.text();
            let result;
            try {
                result = responseText ? JSON.parse(responseText) : {};
            } catch (e) {
                result = {};
            }

            if (!res.ok) {
                throw new Error(result.message || `Error ${res.status}: Order failed`);
            }

            return { data: result.data, error: null };
        } catch (error: any) {
            return { data: null, error: error.message };
        }
    },

    getOrderById: async function (orderId: string) {
        try {
            const cookiesStore = await cookies();
            const res = await fetch(`${API_URL}/api/orders/${orderId}`, {
                headers: {
                    cookie: cookiesStore.toString(),
                },
                cache: "no-store",
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.message || "Failed to fetch order");

            return { data: result.data, error: null };
        } catch (error: any) {
            return { data: null, error: error.message };
        }
    },

    myOrders: async (): Promise<Order[]> => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${API_URL}/api/orders`, {
                headers: {
                    cookie: cookieStore.toString(),
                },
                cache: "no-store",
            });

            if (!res.ok) throw new Error("Failed to fetch orders");

            const result = await res.json();

            return result.data || [];
        } catch (err) {
            console.error("Order fetch error:", err);
            return [];
        }
    },

    getOrderSeller: async function (
        params?: GetMedicinesParams,
        options?: ServiceOptions
    ) {
        try {
            const cookiesStore = await cookies();
            const url = new URL(`${API_URL}/api/seller/orders`);

            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined && value !== null && value !== '') {
                        url.searchParams.append(key, String(value));
                    }
                });
            }

            const config: RequestInit = {
                method: "GET",
                headers: {
                    cookie: cookiesStore.toString(),
                },
                cache: options?.cache || "no-store",
            };

            config.next = {
                ...(options?.revalidate ? { revalidate: options.revalidate } : {}),
                tags: ['orders'],
            };

            const res = await fetch(url.toString(), config);

            if (!res.ok) {
                throw new Error(`API Error: ${res.status} ${res.statusText}`);
            }
            const result = await res.json();

            return { data: result.data || result, error: null };

        } catch (error: any) {
            return {
                data: null,
                error: {
                    message: error?.message || 'Something went wrong',
                    original: error,
                },
            };
        }
    },


    updateOrdersStatus: async function (id: string, payload: { status: string }) {
        try {
            const url = `${API_URL}/api/seller/orders/${id}`;
            const cookieStore = await cookies();

            const res = await fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    cookie: cookieStore.toString(),
                },
                body: JSON.stringify(payload),
                cache: "no-store",
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message || `Failed to update status: ${res.status}`);
            }

            return {
                data: result.data as Order,
                error: null,
            };
        } catch (error: any) {
            console.error("Update Error:", error);
            return {
                data: null,
                error: {
                    message: error?.message || "Something went wrong while updating orders",
                    original: error,
                },
            };
        }
    },


};
