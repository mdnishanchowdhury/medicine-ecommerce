import { Category, categoryService } from "@/services/category.server";
import { LayoutWrapper } from "./ClientWrapper";

export default async function CommonLayout({ children }: { children: React.ReactNode }) {
    let categories: Category[] = [];

    try {
        const { data } = await categoryService.getCategories({ cache: "no-store" });
        categories = data ?? [];
    } catch (error) {
        categories = [];
    }

    return (
        <LayoutWrapper initialCategories={categories}>
            {children}
        </LayoutWrapper>
    );
}