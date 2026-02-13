import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mediService } from "@/services/medi.server";
import { Button } from "@/components/ui/button";
import { Edit, Package } from "lucide-react";
import Link from "next/link";
import { categoryService } from "@/services/category.server";
import DeleteMedicineButton from "../DeleteMedicineButton";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

export default async function SellerMedicineList({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const params = await searchParams;
    const currentPage = Number(params.page) || 1;
    const limit = 20;

    let medicines: any[] = [];
    let meta = { total: 0, totalPages: 0 };

    try {
        const res = await mediService.getMedicines(
            { page: currentPage, limit },
            { cache: "no-store" }
        );

        const responseData = res as any;

        if (responseData?.data) {
            medicines = responseData.data.data || responseData.data || [];
            meta = responseData.data.meta || { total: 0, totalPages: 0 };
        }
    } catch (error) {
        console.error("Fetch Error:", error);
    }

    let categories: any[] = [];
    try {
        const catRes = await categoryService.getCategories({ cache: "no-store" });
        const categoryData = catRes as any;
        if (Array.isArray(categoryData)) {
            categories = categoryData;
        } else if (categoryData?.data && Array.isArray(categoryData.data)) {
            categories = categoryData.data;
        }
    } catch (error) {
        console.error("Category Error:", error);
    }

    const getCategoryName = (id: string) => {
        const category = categories.find((cat: any) => (cat.id || cat._id) === id);
        return category ? category.categoryName : "N/A";
    };

    const createPageURL = (p: number) => `/seller-dashboard/allMedicine?page=${p}`;

    return (
        <div className="p-4 bg-white dark:bg-slate-950 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <Package className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">All Medicines</h2>
                        <p className="text-sm text-slate-500 font-medium">
                            Total {meta.total} items registered
                        </p>
                    </div>
                </div>
                <Link href="/seller-dashboard/allMedicine/addMedicine">
                    <Button className="bg-blue-600 hover:bg-blue-700 shadow-md">Add New Medicine</Button>
                </Link>
            </div>

            <div className="border rounded-xl overflow-hidden shadow-sm bg-white dark:bg-slate-900">
                <Table>
                    <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
                        <TableRow>
                            <TableHead className="w-20">Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            medicines.length > 0 ? (
                                medicines.map((medi: any) => (
                                    <TableRow key={medi.id || medi._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                                        <TableCell>
                                            <div className="h-10 w-10 rounded-lg overflow-hidden border bg-slate-100">
                                                <img src={medi.image} alt="med" className="object-cover h-full w-full" />
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-semibold">{medi.name}</TableCell>
                                        <TableCell>{getCategoryName(medi.categoryId)}</TableCell>
                                        <TableCell className="font-bold text-blue-600">Tk {medi.price}</TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${medi.stock > 10 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                {medi.stock} In Stock
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right flex justify-end gap-2">
                                            <Link href={`/seller-dashboard/allMedicine/edit/${medi.id || medi._id}`}>
                                                <Button variant="outline" size="icon" className="h-8 w-8 text-blue-600">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <DeleteMedicineButton id={medi.id || medi._id} />
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-20 text-slate-400 italic">
                                        No medicines found in the database.
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </div>

            {
                meta.totalPages > 1 && (
                    <div className="mt-8">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href={currentPage > 1 ? createPageURL(currentPage - 1) : "#"}
                                        className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                                    />
                                </PaginationItem>

                                {[...Array(meta.totalPages)].map((_, i) => (
                                    <PaginationItem key={i}>
                                        <PaginationLink
                                            href={createPageURL(i + 1)}
                                            isActive={currentPage === i + 1}
                                        >
                                            {i + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                <PaginationItem>
                                    <PaginationNext
                                        href={currentPage < meta.totalPages ? createPageURL(currentPage + 1) : "#"}
                                        className={currentPage >= meta.totalPages ? "pointer-events-none opacity-50" : ""}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )
            }
        </div>
    );
}