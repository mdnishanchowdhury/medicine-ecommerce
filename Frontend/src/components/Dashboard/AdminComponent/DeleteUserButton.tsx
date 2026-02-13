import { deleteUserAction } from "@/actions/user";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function DeleteUserButton({ userId, userName, onSuccess }: { userId: string, userName: string, onSuccess: () => void }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm(`Are you sure you want to delete ${userName}?`)) return;
        
        setIsDeleting(true);
        const result = await deleteUserAction(userId);
        
        if (result.success) {
            toast.success("User deleted successfully");
            onSuccess();
        } else {
            toast.error(result.error);
        }
        setIsDeleting(false);
    };

    return (
        <button 
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors text-slate-400 hover:text-red-600 disabled:opacity-50"
        >
            {isDeleting ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
        </button>
    );
}