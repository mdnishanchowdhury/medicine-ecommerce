"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Save, X, Pill } from "lucide-react";
import { useState } from "react";
import { updateMedicineAction } from "@/actions/medicine.actions";

interface EditMedicineFormProps {
    medicine: any;
    categories: any[];
}

export default function AdminEditMedicineForm({ medicine, categories }: EditMedicineFormProps) {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState(medicine?.categoryId || "");

    const { register, handleSubmit, formState: { isSubmitting, isDirty } } = useForm({
        defaultValues: {
            name: medicine?.name || "",
            description: medicine?.description || "",
            price: medicine?.price || 0,
            stock: medicine?.stock || 0,
            image: medicine?.image || "",
            manufacturer: medicine?.manufacturer || "",
        }
    });

    const onSubmit = async (values: any) => {
        const id = medicine._id || medicine.id;

        const payload = {
            ...values,
            price: Number(values.price),
            stock: Number(values.stock),
            categoryId: selectedCategory
        };

        const res: any = await updateMedicineAction(id, payload);

        if (res?.success) {
            toast.success("Medicine updated successfully!");
            router.push("/admin-dashboard/allMedicine");
            router.refresh();
        } else {
            const errorMsg = typeof res?.error === 'object' ? res.error.message : res?.error;
            toast.error(errorMsg || "Failed to update medicine");
        }
    };

    return (
        <Card className="max-w-2xl mx-auto shadow-lg border-slate-200">
            <CardHeader className="space-y-1">
                <div className="flex items-center gap-2 mb-2">
                    <Pill className="h-5 w-5 text-blue-600" />
                    <CardTitle className="text-2xl font-bold tracking-tight">Edit Medicine</CardTitle>
                </div>
                <CardDescription>
                    Update details for <span className="font-semibold text-blue-600">{medicine?.name}</span>
                </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-semibold">Medicine Name</Label>
                            <Input
                                id="name"
                                {...register("name", { required: "Name is required" })}
                                className="focus-visible:ring-blue-600"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="manufacturer" className="text-sm font-semibold">Manufacturer</Label>
                            <Input
                                id="manufacturer"
                                {...register("manufacturer", { required: "Manufacturer is required" })}
                                className="focus-visible:ring-blue-600"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="price" className="text-sm font-semibold">Price ($)</Label>
                            <Input
                                id="price"
                                type="number"
                                {...register("price", { required: "Price is required" })}
                                className="focus-visible:ring-blue-600"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="stock" className="text-sm font-semibold">Stock</Label>
                            <Input
                                id="stock"
                                type="number"
                                {...register("stock", { required: "Stock is required" })}
                                className="focus-visible:ring-blue-600"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-semibold">Category</Label>
                            <Select onValueChange={setSelectedCategory} defaultValue={selectedCategory}>
                                <SelectTrigger className="focus-visible:ring-blue-600">
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        categories.map((cat) => (
                                            <SelectItem key={cat._id || cat.id} value={cat._id || cat.id}>
                                                {cat.categoryName}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image" className="text-sm font-semibold">Image URL</Label>
                            <Input
                                id="image"
                                {...register("image")}
                                className="focus-visible:ring-blue-600"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-sm font-semibold">Description</Label>
                        <Textarea
                            id="description"
                            className="min-h-[100px] resize-none focus-visible:ring-blue-600"
                            {...register("description")}
                        />
                    </div>
                </CardContent>

                <CardFooter className="flex justify-between gap-4 pt-4">
                    <Button
                        type="button"
                        variant="ghost"
                        className="flex-1 gap-2 bg-slate-100"
                        onClick={() => router.back()}
                    >
                        <X className="h-4 w-4" /> Cancel
                    </Button>

                    <Button
                        type="submit"
                        disabled={isSubmitting || (!isDirty && selectedCategory === medicine.categoryId)}
                        className="flex-1 gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" /> Updating...
                            </>
                        ) : (
                            <>
                                <Save className="h-4 w-4" /> Save Changes
                            </>
                        )}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}