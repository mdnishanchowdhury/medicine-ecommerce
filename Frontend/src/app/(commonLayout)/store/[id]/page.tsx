import MediCards from "@/components/modules/HomePage/MediCards";
import { mediService } from "@/services/medi.server";
import { Medicine } from "@/types/medi.service";
export const dynamic = "force-dynamic";

export async function generateStaticParams() {
    try {
        const res = await mediService.getMedicines();
        const medicines = res?.data?.data || [];

        if (!Array.isArray(medicines)) return [];
        return medicines
            .map((medi: Medicine) => ({ id: medi.id }))
            .slice(0, 3);
    } catch (error) {
        console.error("Error in generateStaticParams:", error);
        return [];
    }
}

export default async function StorePage({
    params,
    searchParams,
}: {
    params: { id: string };
    searchParams: Promise<{ search?: string }>;
}) {
    const { id } = await params;
    const { search } = await searchParams;

    const { data: medicine } = await mediService.getMedicines({
        categoryId: id,
        search: search || "",
    });

    const medi: Medicine[] = Array.isArray(medicine?.data) ? medicine.data : [];

    return (
        <div className="container mx-auto px-4 mt-28">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Available Medicines</h1>
                    <p className="text-sm text-muted-foreground">Find the medication you need</p>
                </div>
            </div>

            {medi.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {medi.map((item: Medicine) => (
                        <MediCards key={item.id} medicine={item} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-slate-50 rounded-xl border-2 border-dashed">
                    <p className="text-muted-foreground">No medicines found matching your search.</p>
                </div>
            )}
        </div>
    );
}