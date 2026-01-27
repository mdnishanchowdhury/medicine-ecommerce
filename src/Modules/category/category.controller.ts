import { NextFunction, Request, Response } from "express"
import { categoryService } from "./category.service";


const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await categoryService.createCategory(req.body)
        res.status(201).json(result);
    } catch (error) {
        next(error)
    }
}

// Get All Categories
const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json({
            success: true,
            data: categories,
        });
    } catch (error) {
        res.status(400).json({
            error: "Category creation failed",
            details: error
        })
    }
};

// Get Category ById
const getCategoryById = async (req: Request, res: Response) => {
    try {
        const category = await categoryService.getCategoryById(req.params.id as string);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        res.status(200).json({
            success: true,
            data: category,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update Category
const updateCategory = async (req: Request, res: Response) => {
    try {
        const category = await categoryService.updateCategory(
            req.params.id as string,
            req.body
        );

        res.status(200).json({
            success: true,
            data: category,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete Category
const deleteCategory = async (req: Request, res: Response) => {
    try {
        await categoryService.deleteCategory(req.params.id as string);
        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const categoryController = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}