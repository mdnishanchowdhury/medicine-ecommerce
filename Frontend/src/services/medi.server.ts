import { addMedicine, GetMedicinesParams, ServiceOptions } from "@/types/medi.service";
import { Medicine } from "@/types/order";
import { cookies } from "next/headers";

const API_URL = process.env.API_URL;



export const mediService = {
    createMedicine: async function (payload: addMedicine) {
        try {
            const url = `${API_URL}/api/seller/medicines`;
            const cookieStore = await cookies();

            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    cookie: cookieStore.toString(),
                },
                body: JSON.stringify(payload),
                cache: "no-store",
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message || `Failed to create medicine: ${res.status}`);
            }

            return {
                data: result.data as Medicine,
                error: null,
            };
        } catch (error: any) {
            console.error("Post Error:", error);
            return {
                data: null,
                error: {
                    message: error?.message || "Something went wrong while adding Medicine",
                    original: error,
                },
            };
        }
    },

    getMedicines: async function (
        params?: GetMedicinesParams,
        options?: ServiceOptions
    ) {
        try {
            const url = new URL(`${API_URL}/api/medicines`);

            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined && value !== null && value !== '') {
                        url.searchParams.append(key, String(value));
                    }
                });
            }

            const config: RequestInit = {};

            if (options?.cache) {
                config.cache = options.cache;
            }

            config.next = {
                ...(options?.revalidate ? { revalidate: options.revalidate } : {}),
                tags: ['medicines'],
            };

            const res = await fetch(url.toString(), config);

            if (!res.ok) {
                throw new Error(`API Error: ${res.status} ${res.statusText}`);
            }

            const data = await res.json();

            return { data, error: null };
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


    getMedicinesById: async function (id: string) {
        try {
            const res = await fetch(`${API_URL}/api/medicines/${id}`);

            const data = await res.json();

            return { data, error: null };
        } catch (error) {
            return { data: null, error: { message: 'Something went wrong' } };
        }
    },

    getCategoryById: async function (id: string) {
        try {
            const res = await fetch(`${API_URL}/api/medicines?categoryId=${id}`);

            const data = await res.json();

            return { data, error: null };
        } catch (error) {
            return { data: null, error: { message: 'Something went wrong' } };
        }
    },

    updateMedicine: async function (id: string, payload: addMedicine) {
        try {
            const url = `${API_URL}/api/seller/medicines/${id}`;
            const cookieStore = await cookies();

            const res = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    cookie: cookieStore.toString(),
                },
                body: JSON.stringify(payload),
                cache: "no-store",
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message || `Failed to update medicine: ${res.status}`);
            }

            return {
                data: result.data as Medicine,
                error: null,
            };
        } catch (error: any) {
            console.error("Update Error:", error);
            return {
                data: null,
                error: {
                    message: error?.message || "Something went wrong while updating medicine",
                    original: error,
                },
            };
        }
    },

    deleteMedicine: async function (id: string) {
        try {
            const url = `${API_URL}/api/seller/medicines/${id}`;
            const cookieStore = await cookies();

            const res = await fetch(url, {
                method: "DELETE",
                headers: {
                    cookie: cookieStore.toString(),
                },
                cache: "no-store",
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message || `Failed to delete medicine: ${res.status}`);
            }

            return {
                success: true,
                error: null,
            };
        } catch (error: any) {
            console.error("Delete Error:", error);
            return {
                success: false,
                error: {
                    message: error?.message || "Something went wrong while deleting medicine",
                    original: error,
                },
            };
        }
    },
};
