import { env } from "@/env";
import { GetUsersParams, ServiceOptions } from "@/types/users";
import { cookies } from "next/headers";

const AUTH_API = env.AUTH_URL;
const API_URL = process.env.API_URL;

export const userService = {
    getSession: async function () {
        try {
            const cookiesStore = await cookies();
            const res = await fetch(`${AUTH_API}/get-session`, {
                headers: {
                    cookie: cookiesStore.toString(),
                },
                cache: "no-store",
            });

            if (!res.ok) {
                return { data: null, error: { message: "Failed to fetch session." } };
            }

            const session = await res.json();

            if (!session) {
                return { data: null, error: { message: "No active session found." } };
            }

            return { data: session, error: null };

        } catch (error) {
            console.warn("Session check skipped during build or server offline.");
            return {
                data: null,
                error: { message: "Session fetching failed." }
            };
        }
    },

    getUsers: async function (
        params?: GetUsersParams,
        options?: ServiceOptions
    ) {
        try {
            const url = new URL(`${API_URL}/api/users`);

            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined && value !== null && value !== '') {
                        url.searchParams.append(key, String(value));
                    }
                });
            }

            const config: RequestInit = {
                method: "GET",
            };

            if (options?.cache) {
                config.cache = options.cache;
            }

            config.next = {
                ...(options?.revalidate ? { revalidate: options.revalidate } : {}),
                tags: ['users'],
            };

            const res = await fetch(url.toString(), config);

            if (!res.ok) {
                throw new Error(`API Error: ${res.status} ${res.statusText}`);
            }

            const result = await res.json();

            return { data: result.data, error: null };

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
    updateUser: async function (id: string, userData: any) {
        try {
            const cookiesStore = await cookies();
            const res = await fetch(`${API_URL}/api/users/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    cookie: cookiesStore.toString(),
                },
                body: JSON.stringify(userData),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message || "Failed to update user");
            }

            return { data: result.data, error: null };
        } catch (error: any) {
            return {
                data: null,
                error: {
                    message: error?.message || "Something went wrong during update",
                },
            };
        }
    },

    deleteUser: async function (id: string) {
        try {
            const cookiesStore = await cookies();
            const res = await fetch(`${API_URL}/api/users/${id}`, {
                method: "DELETE",
                headers: {
                    Cookie: cookiesStore.toString(),
                },
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message || "Failed to delete user");
            }

            return { data: result, error: null };
        } catch (error: any) {
            return {
                data: null,
                error: {
                    message: error?.message || "Something went wrong during deletion",
                },
            };
        }
    },

}