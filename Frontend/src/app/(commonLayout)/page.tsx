import MediCards from "@/components/modules/HomePage/MediCards";
import CategorySection from "@/components/modules/HomePage/CategorySection";
import { mediService } from "@/services/medi.server";
import { Medicine } from "@/types/medi.service";
import { Category, categoryService } from "@/services/category.server";
import HeroMedicine from "@/components/layout/banner";
import { Help1 } from "@/components/layout/help1";
import { Logos8 } from "@/components/layout/logos8";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import HomeSections from "@/components/layout/HomeSections";

export const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const { search, category, minPrice, maxPrice, page = "1" } = params;

  const currentPage = Number(page) || 1;
  const limit = 9;

  let medi: Medicine[] = [];
  let meta = { total: 0, totalPages: 0 };

  try {
    const res = await mediService.getMedicines(
      {
        search: search || "",
        categoryId: category,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        page: currentPage,
        limit,
      },
      { cache: "no-store" }
    );

    const responseData = res as any;
    if (responseData?.success) {
      medi = responseData.data || [];
      meta = responseData.meta || { total: 0, totalPages: 0 };
    } else {
      medi = responseData?.data?.data || responseData?.data || [];
      meta = responseData?.data?.meta || responseData?.meta || { total: 0, totalPages: 0 };
    }
  } catch (error) {
    console.error("Fetch Error:", error);
  }

  let categories: Category[] = [];
  try {
    const catRes = await categoryService.getCategories({ cache: "no-store" });
    const catData = catRes as any;
    categories = catData?.data || catData || [];
  } catch (error) {
    categories = [];
  }

  const createPageURL = (p: number) => {
    const newParams = new URLSearchParams();
    if (search) newParams.set("search", search);
    if (category) newParams.set("category", category);
    if (minPrice) newParams.set("minPrice", minPrice);
    if (maxPrice) newParams.set("maxPrice", maxPrice);
    newParams.set("page", p.toString());
    return `/?${newParams.toString()}`;
  };

  return (
    <main className="bg-[#f8fafc] dark:bg-black min-h-screen">
      <HeroMedicine />

      <div className="container mx-auto px-4 pb-10">
        <div className="flex flex-col lg:flex-row gap-6 mt-6">

          <aside className="w-75 shrink-0 space-y-4">
            <CategorySection categories={categories} />
          </aside>

          {/* Main Content */}
          <section className="w-full lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                {search ? `Results for "${search}"` : "All Medicines"}
              </h2>
              <span className="text-sm font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-4 py-1.5 rounded-full">
                {meta.total} items found
              </span>
            </div>

            {medi.length > 0 ? (
              <>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {medi.map((medicine: any) => (
                    <MediCards key={medicine.id || medicine._id} medicine={medicine} />
                  ))}
                </div>

                {/* Pagination */}
                {meta.totalPages > 1 && (
                  <div className="mt-12">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            href={currentPage > 1 ? createPageURL(currentPage - 1) : "#"}
                            className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>

                        {/* Page Numbers Logic */}
                        {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map((p) => (
                          <PaginationItem key={p}>
                            <PaginationLink
                              href={createPageURL(p)}
                              isActive={p === currentPage}
                              className={p === currentPage ? "bg-blue-600 text-white rounded-xl" : "rounded-xl"}
                            >
                              {p}
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
                )}
              </>
            ) : (
              <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                <div className="text-slate-400 italic mb-4 text-lg">No medicines found matching your filters.</div>
                <Link href="/" className="text-blue-600 font-bold hover:underline">
                  Clear all filters
                </Link>
              </div>
            )}
          </section>
        </div>
      </div>
      <HomeSections/>
      <Logos8 />
      <Help1 />
    </main>
  );
}