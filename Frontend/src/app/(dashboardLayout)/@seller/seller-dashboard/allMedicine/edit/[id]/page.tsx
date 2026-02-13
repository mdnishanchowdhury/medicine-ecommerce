import SellerEditMedicineForm from "@/components/Dashboard/SellerComponent/SellerEditMedicineForm";
import { categoryService } from "@/services/category.server";
import { mediService } from "@/services/medi.server";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    let categories: any = [];
    try {
        const catRes = await categoryService.getCategories();
        categories = catRes?.data || catRes || [];
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
    let medicine = null;
    try {
        const { data: medicinesRes } = await mediService.getMedicines({}, { cache: "no-store" });
        const allMedicines = medicinesRes?.data || medicinesRes || [];
        medicine = allMedicines.find((m: any) => (m._id || m.id) === id);
    } catch (error) {
        console.error("Error fetching medicine:", error);
    }
    if (!medicine) {
        notFound();
    }


    return (
        <div className="max-w-4xl mx-auto p-6">
            <SellerEditMedicineForm medicine={medicine} categories={categories} />
        </div>
    );
}