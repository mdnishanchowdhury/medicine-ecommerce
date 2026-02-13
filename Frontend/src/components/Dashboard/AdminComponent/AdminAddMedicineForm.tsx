"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pill, Loader2, DollarSign, Package, Factory, Image as ImageIcon, Tag, TextQuote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { addMedicineAction } from "@/actions/medicine.actions";

export default function AdminAddMedicineForm({ categories }: { categories: any[] }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!selectedCategory) {
            toast.error("Please select a category");
            return;
        }

        setLoading(true);
        const formData = new FormData(event.currentTarget);

        const payload = {
            name: formData.get("name") as string,
            description: formData.get("description") as string,
            price: Number(formData.get("price")),
            stock: Number(formData.get("stock")),
            image: formData.get("image") as string,
            manufacturer: formData.get("manufacturer") as string,
            categoryId: selectedCategory,
        };

        const toastId = toast.loading("Adding medicine...");

        try {
            const result = await addMedicineAction(payload);
            if (result && !result.error) {
                toast.success("Medicine added successfully!", { id: toastId });
                router.refresh();
                router.push("/admin-dashboard/allMedicine");
            } else {
                toast.error(result?.error?.message || "Failed to add medicine", { id: toastId });
            }
        } catch (error) {
            toast.error("An unexpected error occurred", { id: toastId });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <div className="mb-6 flex items-center gap-2">
                <Pill className="h-6 w-6 text-blue-600" />
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Add New Medicine</h1>
            </div>

            <Card className="shadow-lg border-slate-200">
                <CardHeader>
                    <CardTitle className="text-lg">Medicine Details</CardTitle>
                    <CardDescription>Fill in the info to add a new medicine to your store.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name" className="font-semibold text-slate-700">Medicine Name</Label>
                                <div className="relative">
                                    <Pill className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                    <Input id="name" name="name" placeholder="e.g. Napa" required className="pl-10 focus-visible:ring-blue-600" />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="manufacturer" className="font-semibold text-slate-700">Manufacturer</Label>
                                <div className="relative">
                                    <Factory className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                    <Input id="manufacturer" name="manufacturer" placeholder="e.g. Square Pharmaceuticals" required className="pl-10 focus-visible:ring-blue-600" />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="price" className="font-semibold text-slate-700">Price</Label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                    <Input id="price" name="price" type="number" placeholder="180" required className="pl-10 focus-visible:ring-blue-600" />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="stock" className="font-semibold text-slate-700">Stock Quantity</Label>
                                <div className="relative">
                                    <Package className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                    <Input id="stock" name="stock" type="number" placeholder="50" required className="pl-10 focus-visible:ring-blue-600" />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="categoryId" className="font-semibold text-slate-700">Category</Label>
                                <Select onValueChange={setSelectedCategory} required>
                                    <SelectTrigger className="focus-visible:ring-blue-600">
                                        <div className="flex items-center gap-2">
                                            <Tag className="h-4 w-4 text-slate-400" />
                                            <SelectValue placeholder="Select a category" />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            categories.length > 0 ? (
                                                categories.map((cat) => (
                                                    <SelectItem key={cat._id || cat.id} value={cat._id || cat.id}>
                                                        {cat.categoryName}
                                                    </SelectItem>
                                                ))
                                            ) : (
                                                <SelectItem value="none" disabled>No categories found</SelectItem>
                                            )
                                        }
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="image" className="font-semibold text-slate-700">Image URL</Label>
                                <div className="relative">
                                    <ImageIcon className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                    <Input id="image" name="image" placeholder="https://i.ibb.co/..." required className="pl-10 focus-visible:ring-blue-600" />
                                </div>
                            </div>
                        </div>

                        {/* Description Textarea */}
                        <div className="grid gap-2">
                            <Label htmlFor="description" className="font-semibold text-slate-700">Description</Label>
                            <div className="relative flex">
                                <TextQuote className="absolute left-3 top-10 h-4 w-4 text-slate-400" />
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="Iron supplement used to treat iron deficiency and anemia..."
                                    required
                                    className="pl-10 min-h-[120px] focus-visible:ring-blue-600"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <Button type="button" variant="outline" onClick={() => router.back()} disabled={loading}>Cancel</Button>
                            <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 min-w-35 text-white">
                                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Add Medicine"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}