import { OrderStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const createOrder = async (data: {
    customerId: string;
    shippingAddress: string;
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

export const ordersService = {
    createOrder
};
