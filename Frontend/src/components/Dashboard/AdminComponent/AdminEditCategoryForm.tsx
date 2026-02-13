"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateCategoryAction } from "@/actions/category.actions";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, Save, X } from "lucide-react";

export default function AdminEditCategoryForm({ category }: { category: any }) {
    const router = useRouter();

    const { register, handleSubmit, formState: { isSubmitting, isDirty } } = useForm({
        defaultValues: {
            categoryName: category?.categoryName || "",
            description: category?.description || "",
        }
    });

    const onSubmit = async (values: any) => {
        const id = category._id || category.id;
        const res: any = await updateCategoryAction(id, values);

        if (res?.success) {
            toast.success("Category updated successfully!");
            router.push("/admin-dashboard/allCategory");
            router.refresh();
        } else {
            const errorMsg = typeof res?.error === 'object' ? res.error.message : res?.error;
            toast.error(errorMsg || "Failed to update category");
        }
    };

    return (
        <Card className="w-[450px]  mx-auto shadow-lg border-slate-200">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold tracking-tight">Edit Category</CardTitle>
                <CardDescription>
                    Update the details for <span className="font-semibold text-primary">{category?.categoryName}</span>
                </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="categoryName" className="text-sm font-semibold">
                            Category Name
                        </Label>
                        <Input
                            id="categoryName"
                            placeholder="e.g. Antibiotics"
                            className="focus-visible:ring-ring transition-all"
                            {...register("categoryName", { required: "Name is required" })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-sm font-semibold">
                            Description
                        </Label>
                        <Textarea
                            id="description"
                            placeholder="Briefly describe this category..."
                            className="min-h-[100px] resize-none transition-all"
                            {...register("description")}
                        />
                    </div>
                </CardContent>

                <CardFooter className="flex justify-between gap-4 pt-8">
                    <Button
                        type="button"
                        variant="ghost"
                        className="flex-1 gap-2 bg-blue-100"
                        onClick={() => router.back()}
                    >
                        <X className="h-4 w-4" /> Cancel
                    </Button>

                    <Button
                        type="submit"
                        disabled={isSubmitting || !isDirty}
                        className="flex-1 gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="h-4 w-4" />
                                Save Changes
                            </>
                        )}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}