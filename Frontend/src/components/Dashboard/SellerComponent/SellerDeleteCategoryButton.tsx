"use client";

import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { deleteCategoryAction } from "@/actions/category.actions";

export default function SellerDeleteCategoryButton({ id }: { id: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const executeDelete = async () => {
        setLoading(true);
        try {
            const res = (await deleteCategoryAction(id)) as any;

            if (res?.error) {
                const errorMessage = typeof res.error === 'object'
                    ? res.error.message
                    : res.error;

                toast.error(errorMessage || "Failed to delete");
                setLoading(false);
            } else {
                toast.success("Category deleted successfully!");
                router.refresh();
                setLoading(false);
            }
        } catch (err) {
            toast.error("Something went wrong during deletion");
            setLoading(false);
        }
    };

    const handleConfirm = () => {
        toast.warning("Delete Category?", {
            description: "Are you sure? This action cannot be undone.",
            duration: 5000,
            action: {
                label: "Confirm Delete",
                onClick: () => executeDelete(),
            },
            cancel: {
                label: "Cancel",
                onClick: () => toast.dismiss(),
            },
            style: {
                padding: '16px',
            },
        });
    };

    return (
        <Button
            variant="destructive"
            size="icon"
            onClick={handleConfirm}
            disabled={loading}
            className="h-8 w-8"
        >
            {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <Trash2 className="h-4 w-4" />
            )}
        </Button>
    );
}