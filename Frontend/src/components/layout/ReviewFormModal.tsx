"use client";

import { useState } from "react";
import { Star, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createReviewAction } from "@/actions/review";

interface Props {
  medicineId: string;
  orderItemId?: string;
}


export default function ReviewInline({ medicineId, orderItemId }: Props) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    if (!comment) return;

    await createReviewAction({
      medicineId,
      orderItemId: orderItemId!,
      rating,
      comment,
    });

    setComment("");
  };

  return (
    <div className="space-y-2">

      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => setRating(star)}
            className="cursor-pointer"
          >
            <Star
              size={22}
              fill={rating >= star ? "#EAB308" : "none"}
              className={rating >= star ? "text-yellow-500" : "text-gray-300"}
            />
          </span>
        ))}
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Share your thoughts..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="flex-1 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
        />

        <Button
          onClick={handleSubmit}
          className="h-auto px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
        >
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
}
