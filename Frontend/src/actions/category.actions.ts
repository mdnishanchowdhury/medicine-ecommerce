"use server";

import { categoryService } from "@/services/category.server";
import { revalidatePath, revalidateTag } from "next/cache";

export type ActionResponse = {
    success: boolean;
    data?: any;
    error?: string;
};

export async function deleteCategoryAction(id: string): Promise<ActionResponse> {
    try {
        const res = await categoryService.deleteCategory(id) as any;

        if (res && res.error) {
            return {
                success: false,
                error: typeof res.error === 'object' ? res.error.message : res.error
            };
        }

        revalidatePath("/admin-dashboard/allCategory");
        revalidatePath("/seller-dashboard/allCategory");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: "Failed to delete category" };
    }
}

export async function updateCategoryAction(id: string, formData: any): Promise<ActionResponse> {
    try {
        const res = await categoryService.updateCategory(id, formData) as any;

        if (res && res.error) {
            return {
                success: false,
                error: typeof res.error === 'object' ? res.error.message : res.error
            };
        }

        revalidatePath("/admin-dashboard/allCategory");
        revalidatePath("/seller-dashboard/allCategory");
        return { success: true, data: res.data };
    } catch (error: any) {
        return { success: false, error: "An unexpected error occurred during update" };
    }
}

export async function addCategoryAction(formData: any) {
    try {
        const result = await categoryService.createCategory(formData);

        if (result && !result.error) {
            revalidateTag('categories', 'max');
            revalidatePath("/admin-dashboard/allCategory");
            revalidatePath("/seller-dashboard/allCategory");
        }

        return result;
    } catch (error: any) {
        if (error.code === 11000 || error.message?.includes("E11000")) {
            return {
                error: { message: "A category with this name already exists!" }
            };
        }
        return {
            error: { message: "A server error occurred. Please try again later." }
        };
    }
}