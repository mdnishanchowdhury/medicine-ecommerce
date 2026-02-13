"use server";

import { userService } from "@/services/user.service";
import { revalidatePath } from "next/cache";

export async function updateUserAction(id: string, payload: { name: string; phone: string }) {
    const result = await userService.updateUser(id, payload);

    if (!result.error) {
        revalidatePath("/profile");
    }

    return result;
}

export async function deleteUserAction(id: string) {
    try {
        const res = await userService.deleteUser(id);

        if (res.error) {
            return {
                success: false,
                error: res.error.message || "Failed to delete user"
            };
        }

        revalidatePath("/admin-dashboard/users");

        return { success: true };
    } catch (error: any) {
        return { success: false, error: "Failed to delete user" };
    }
}