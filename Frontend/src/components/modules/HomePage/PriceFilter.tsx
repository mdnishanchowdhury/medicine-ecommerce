"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

export default function PriceFilter({ search, category }: { search?: string, category?: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const min = Number(searchParams.get("minPrice")) || 0;
    const max = Number(searchParams.get("maxPrice")) || 1000;

    const [range, setRange] = useState([min, max]);

    const handleSliderChange = (value: number[]) => {
        setRange(value);
    };

    const applyFilter = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("minPrice", range[0].toString());
        params.set("maxPrice", range[1].toString());
        params.set("page", "1");
        router.push(`/?${params.toString()}`);
    };

    return (
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-1">Price Range</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                Set your budget range (${range[0]} - ${range[1]}).
            </p>

            <div className="px-2 mb-6">
                <Slider
                    defaultValue={[min, max]}
                    max={2000}
                    step={10}
                    onValueChange={handleSliderChange}
                    className="cursor-pointer"
                />
            </div>

            <Button
                onClick={applyFilter}
                className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all active:scale-[0.98]"
            >
                Apply Filter
            </Button>
        </div>
    );
}