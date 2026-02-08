import { Request, Response } from "express";
import { reviewService } from "./review.server";

const createReview = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { medicineId, rating, comment } = req.body;
        if (!medicineId || rating === undefined || !comment) {
            return res.status(400).json({
                success: false,
                message: "Medicine ID, rating, and comment are required",
            });
        }

        const review = await reviewService.createReview({
            customerId: req.user.id,
            medicineId,
            rating: Number(rating),
            comment,
        });

        res.status(201).json({
            success: true,
            data: review,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

const getReviewById = async (req: Request, res: Response) => {
    try {
        const { reviewId } = req.params;

        const result = await reviewService.getReviewById(reviewId as string);

        if (!result) {
            return res.status(404).json({ success: false, message: "Review not found" });
        }

        res.status(200).json({ success: true, data: result });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const getReviewsByAuthor = async (req: Request, res: Response) => {
    try {
        const { authorId } = req.params;

        if (!authorId) {
            return res.status(400).json({ success: false, message: "Author ID is required" });
        }

        const result = await reviewService.getReviewsByAuthor(authorId as string);

        res.status(200).json({
            success: true,
            message: "Comments fetched successfully",
            data: result
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Comments fetch failed",
            error: error.message || error
        });
    }
}

export const reviewController = {
    createReview,
    getReviewById,
    getReviewsByAuthor
};
