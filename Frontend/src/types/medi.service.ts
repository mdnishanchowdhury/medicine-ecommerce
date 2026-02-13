export interface Category {
    id: string;
    categoryName: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export interface Medicine {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    manufacturer: string;
    isActive: boolean;
    categoryId: string;
    authorId: string;
    createdAt: string;
    updatedAt: string;
    category: Category;
    reviews: any[];
}

export interface GetMedicinesResponse {
    success: boolean;
    data: Medicine[];
}

export interface ServiceOptions {
    cache?: RequestCache;
    revalidate?: number;
}

export interface GetMedicinesParams {
    isFeatured?: boolean;
    search?: string;
    categoryId?: string;
    minPrice?: number;
    maxPrice?: number;
    isActive?: boolean;
    page?: number;
    limit?: number;
}
export interface addMedicine {
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    manufacturer: string;
    categoryId: string;
}