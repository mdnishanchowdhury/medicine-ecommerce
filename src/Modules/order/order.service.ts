import { OrderStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const createOrder = async (data: {
    customerId: string;
    shippingAddress: string;
    phoneNumber: string;
    items: {
        medicineId: string;
        sellerId: string;
        quantity: number;
        price: number;
    }[];
}) => {
    const totalAmount = data.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    return prisma.order.create({
        data: {
            customerId: data.customerId,
            shippingAddress: data.shippingAddress,
            phoneNumber: data.phoneNumber,
            totalAmount,
            status: OrderStatus.PLACED,
            orderItems: {
                create: data.items.map((item) => ({
                    medicineId: item.medicineId,
                    sellerId: item.sellerId,
                    quantity: item.quantity,
                    price: item.price,
                })),
            },
        },
        include: {
            orderItems: true,
        },
    });
};

const getMyOrders = async (customerId: string) => {
    return prisma.order.findMany({
        where: { customerId },
        include: {
            orderItems: {
                include: {
                    medicine: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};

const getOrderById = async (orderId: string, userId: string) => {
    return prisma.order.findFirst({
        where: {
            id: orderId,
            customerId: userId,
        },
        include: {
            orderItems: {
                include: {
                    medicine: true,
                },
            },
        },
    });
};


const getSellerOrders = async () => {
    const orders = await prisma.order.findMany({
        include: {
            orderItems: {
                include: {
                    medicine: true,
                },
            },
        },
        orderBy: { createdAt: "desc" },
    });

    return orders;
};

const updateOrderStatus = async (orderId: string, sellerId: string, status: OrderStatus) => {
    // Shudhu check kora je order-ti database-e ache kina
    const orderExists = await prisma.order.findUnique({
        where: { id: orderId }
    });

    if (!orderExists) {
        throw new Error("Order not found!");
    }

    // Direct update (Verification chhara testing-er jonno)
    return prisma.order.update({
        where: { id: orderId },
        data: { status }
    });
};

export const ordersService = {
    createOrder,
    getMyOrders,
    getOrderById,
    getSellerOrders,
    updateOrderStatus
};
