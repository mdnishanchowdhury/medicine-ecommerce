import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { categoryService } from "@/services/category.server";
import { Category } from "@/types/medi.service";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Link from "next/link";
import DeleteCategoryButton from "../AdminComponent/AdminDeleteCategoryButton";

export default async function SellerCategoryList() {
    let categories: Category[] = [];
    try {
        const { data } = await categoryService.getCategories({ cache: "no-store" });
        categories = data ?? [];
    } catch (error) {
        categories = [];
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">All Categories</h2>
                <Link href="/seller-dashboard/allCategory/addCategory">
                    <Button className="bg-blue-600 hover:bg-blue-700">Add New Category</Button>
                </Link>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Category Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categories.map((cat: any) => {
                        const id = cat._id || cat.id;
                        return (
                            <TableRow key={id}>
                                <TableCell className="font-medium">{cat.categoryName}</TableCell>
                                <TableCell>{cat.description}</TableCell>
                                <TableCell className="text-right flex justify-end gap-2">
                                    <Link href={`/seller-dashboard/allCategory/edit/${id}`}>
                                        <Button variant="outline" size="icon">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    </Link>

                                    <DeleteCategoryButton id={id} />
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}