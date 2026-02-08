import { prisma } from "../../lib/prisma";

const createReview = async (data: {
    customerId: string;
    medicineId: string;
    rating: number;
    comment: string;
}) => {
    return prisma.review.create({
        data: {
            customerId: data.customerId,
            medicineId: data.medicineId,
            rating: data.rating,
            comment: data.comment,
        },
        include: {
            medicine: true, 
        },
    });
};
const getReviewById = async (id: string) => {
    return await prisma.review.findUnique({
        where: {
            id
        },
        include: {
            medicine: { 
                select: {
                    id: true,
                    name: true, 
                    price: true
                }
            }
        }
    })
}

const getReviewsByAuthor = async (authorId: string) => {
    return await prisma.review.findMany({
        where: {
            customerId: authorId, 
        },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            medicine: { 
                select: {
                    id: true,
                    name: true, 
                }
            }
        }
    });
}

export const reviewService = {
    createReview,
    getReviewById,
    getReviewsByAuthor
};
