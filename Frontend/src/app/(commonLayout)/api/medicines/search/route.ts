import { mediService } from "@/services/medi.server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query) return NextResponse.json({ data: [] });

    try {
        const res = await mediService.getMedicines({ search: query });
        return NextResponse.json({ data: res?.data?.data || [] });
    } catch (error) {
        return NextResponse.json({ data: [], error: "Failed to fetch" }, { status: 500 });
    }
}