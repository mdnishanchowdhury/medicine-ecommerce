import { prisma } from "../../lib/prisma";

// create Category
const createCategory = async (data: {
    categoryName: string;
    description: string;
}) => {
    const result = await prisma.category.create({
        data: {
            ...data,
        }
    })
    return result;
}

// get All Categories
const getAllCategories = async () => {
    return prisma.category.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
};

// Get Category ById
const getCategoryById = async (id: string) => {
    return prisma.category.findUnique({
        where: { id },
    });
};

// Update Category
const updateCategory = async (
    id: string,
    data: { categoryName?: string; description?: string }
) => {
    return prisma.category.update({
        where: { id },
        data,
    });
};

// Delete Category
const deleteCategory = async (id: string) => {
    return prisma.category.delete({
        where: { id },
    });
};

export const categoryService = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}