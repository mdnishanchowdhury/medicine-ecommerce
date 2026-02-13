"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutGrid, Loader2, PlusCircle, TextQuote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { toast } from "sonner";
import { addCategoryAction } from "@/actions/category.actions";

export default function AdminAddCategoryForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const categoryName = formData.get("categoryName") as string;
        const description = formData.get("description") as string;

        const toastId = toast.loading("Adding category...");

        try {
            const result = await addCategoryAction({ categoryName, description });

            if (result.error) {
                toast.error(result.error.message, { id: toastId });
            } else {
                toast.success("Category added successfully!", { id: toastId });
                (event.target as HTMLFormElement).reset();
                router.refresh();
                router.push("/admin-dashboard/allCategory");
            }
        } catch (error) {
            toast.error("An unexpected error occurred", { id: toastId });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-4xl mx-auto py-10 px-4">
            <div className="mb-6 flex items-center gap-2">
                <LayoutGrid className="h-6 w-6 text-blue-600" />
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Add New Category</h1>
            </div>

            <Card className="shadow-lg border-slate-200">
                <CardHeader>
                    <CardTitle className="text-lg">Category Details</CardTitle>
                    <CardDescription>
                        Create a new classification for your medicines.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Category Name */}
                        <div className=" grid gap-2">
                            <Label htmlFor="categoryName" className="font-semibold text-slate-700">
                                Category Name
                            </Label>
                            <div className="relative">
                                <PlusCircle className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                <Input
                                    id="categoryName"
                                    name="categoryName"
                                    placeholder="e.g. Endocrine, Neurological"
                                    required
                                    className="pl-10 focus-visible:ring-blue-600"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="grid gap-2 ">
                            <Label htmlFor="description" className="font-semibold text-slate-700">
                                Description
                            </Label>
                            <div className="relative flex">
                                <TextQuote className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="Describe what kind of medicines fall into this category..."
                                    required
                                    className="pl-10 min-h-[120px] focus-visible:ring-blue-600"
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    "Create Category"
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}