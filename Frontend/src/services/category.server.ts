import { cookies } from "next/headers";

const API_URL = process.env.API_URL;
interface ServiceOptions {
    cache?: RequestCache;
    revalidate?: number;
}

export interface Category {
    id: string;
    categoryName: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export const categoryService = {

    createCategory: async function (payload: { categoryName: string; description: string }) {
        try {
            const url = `${API_URL}/category`;
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
                throw new Error(result.message || `Failed to create category: ${res.status}`);
            }

            return {
                data: result.data as Category,
                error: null,
            };
        } catch (error: any) {
            console.error("Post Error:", error);
            return {
                data: null,
                error: {
                    message: error?.message || "Something went wrong while adding category",
                    original: error,
                },
            };
        }
    },

    getCategories: async function (options?: ServiceOptions) {
        try {
            const url = `${API_URL}/category`;

            const config: RequestInit = {
                method: "GET",
                next: {
                    revalidate: options?.revalidate ?? 3600,
                    tags: ['categories'],
                },
            };

            const res = await fetch(url, config);

            if (!res.ok) {
                throw new Error(`API Error: ${res.status} ${res.statusText}`);
            }

            const result = await res.json();

            return {
                data: result.success ? (result.data as Category[]) : [],
                error: null
            };
        } catch (error: any) {
            console.error("Fetch Error:", error);
            return {
                data: null,
                error: {
                    message: error?.message || 'Something went wrong',
                    original: error,
                },
            };
        }
    },
    updateCategory: async function (id: string, payload: { categoryName?: string; description?: string }) {
        try {
            const url = `${API_URL}/category/${id}`;
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
                throw new Error(result.message || `Failed to update category: ${res.status}`);
            }

            return {
                data: result.data as Category,
                error: null,
            };
        } catch (error: any) {
            console.error("Update Error:", error);
            return {
                data: null,
                error: {
                    message: error?.message || "Something went wrong while updating category",
                    original: error,
                },
            };
        }
    },

    deleteCategory: async function (id: string) {
        try {
            const url = `${API_URL}/category/${id}`;
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
                throw new Error(result.message || `Failed to delete category: ${res.status}`);
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
                    message: error?.message || "Something went wrong while deleting category",
                    original: error,
                },
            };
        }
    },
};