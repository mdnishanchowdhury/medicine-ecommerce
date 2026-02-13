import SellerAddMedicineForm from "@/components/Dashboard/SellerComponent/SellerAddMedicineForm";
import { categoryService } from "@/services/category.server";
export const dynamic = "force-dynamic";
export default async function AddMedicinePage() {
    let categories: any = []; 
    
    try {
        const response = await categoryService.getCategories({ cache: "no-store" });

        categories = response?.data || response || [];
        
    } catch (error) {
        console.error("Error fetching categories:", error);
        categories = [];
    }

    return (
        <div className="p-4">
             <SellerAddMedicineForm categories={categories} />
        </div>
    );
}