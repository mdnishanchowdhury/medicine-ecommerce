"use server";

import { mediService } from "@/services/medi.server";
import { revalidatePath, revalidateTag } from "next/cache";

export type ActionResponse = {
    success: boolean;
    data?: any;
    error?: string;
};


export async function addMedicineAction(formData: any) {
    try {
        const result = await mediService.createMedicine(formData);

        if (result && !result.error) {
            revalidateTag('medicines', 'max');
            revalidatePath("/admin-dashboard/allMedicine");
            revalidatePath("/seller-dashboard/allCategory");
        }

        return result;
    } catch (error: any) {
        if (error.code === 11000 || error.message?.includes("E11000")) {
            return {
                error: { message: "A medicine with this name already exists!" }
            };
        }
        return {
            error: { message: "A server error occurred. Please try again later." }
        };
    }
}

export async function updateMedicineAction(id: string, formData: any): Promise<ActionResponse> {
    try {
        const res = await mediService.updateMedicine(id, formData) as any;

        if (res && res.error) {
            return {
                success: false,
                error: typeof res.error === 'object' ? res.error.message : res.error
            };
        }

        revalidatePath("/admin-dashboard/allMedicine");
        revalidatePath("/seller-dashboard/allCategory");
        return { success: true, data: res.data };
    } catch (error: any) {
        return { success: false, error: "An unexpected error occurred during update" };
    }
}


export async function deleteMedicineAction(id: string): Promise<ActionResponse> {
    try {
        const res = await mediService.deleteMedicine(id) as any;

        if (res && res.error) {
            return {
                success: false,
                error: typeof res.error === 'object' ? res.error.message : res.error
            };
        }

        revalidatePath("/admin-dashboard/allMedicine");
        revalidatePath("/seller-dashboard/allCategory");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: "Failed to delete category" };
    }
}