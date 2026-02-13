import SellerEditCategoryForm from "@/components/Dashboard/SellerComponent/SellerEditCategoryForm";
import { categoryService } from "@/services/category.server";
import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    const { data: categories } = await categoryService.getCategories();

    const category = categories?.find((c: any) => (c._id || c.id) === id);

    if (!category) {
        notFound();
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Update Category</h1>
            <SellerEditCategoryForm category={category} />
        </div>
    );
}