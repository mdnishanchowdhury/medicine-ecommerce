"use client";

import { useState } from "react";
import { Trash2, Edit, Loader2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { deleteUserAction } from "@/actions/user";

export function UserTableActions({ userId, userName }: { userId: string; userName: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const executeDelete = async () => {
    setIsDeleting(true);
    setShowConfirm(false);
    try {
      const res = await deleteUserAction(userId);
      if (res.success) {
        toast.success(`${userName} has been deleted successfully.`);
      } else {
        toast.error(res.error || "Failed to delete.");
      }
    } catch (error) {
      toast.error("A server error occurred.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-end gap-2">
        <button
          onClick={() => setShowConfirm(true)}
          disabled={isDeleting}
          className={cn(
            "p-2 rounded-lg transition-all duration-200",
            isDeleting 
              ? "bg-slate-100 text-slate-400" 
              : "text-slate-400 hover:bg-red-50 hover:text-red-600"
          )}
        >
          {isDeleting ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Trash2 size={18} />
          )}
        </button>
      </div>

      {
      showConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-[1px] animate-in fade-in duration-200"
            onClick={() => setShowConfirm(false)}
          />

          <div className="relative w-full max-w-[400px] bg-[#FFFBEB] border border-orange-100 rounded-xl p-5 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <AlertTriangle className="text-orange-600" size={24} fill="currentColor" fillOpacity={0.1} />
              </div>
              
              <div className="flex-1">
                <h3 className="text-[#B45309] font-bold text-lg leading-tight">
                  Delete Medicine?
                </h3>
                <p className="text-[#D97706] text-sm mt-1 leading-snug">
                  Are you sure? This action cannot be undone.
                </p>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="px-4 py-2 text-sm font-semibold text-slate-700 bg-[#E5E7EB] hover:bg-gray-300 rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={executeDelete}
                    className="px-4 py-2 text-sm font-semibold text-white bg-[#111827] hover:bg-black rounded-md transition-colors"
                  >
                    Confirm Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
      }
    </>
  );
}