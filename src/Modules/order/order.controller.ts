import { Request, Response, NextFunction } from "express";
import { ordersService } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { shippingAddress, items } = req.body;

        if (!shippingAddress || !items?.length) {
            return res.status(400).json({
                success: false,
                message: "Shipping address and items are required",
            });
        }

        const order = await ordersService.createOrder({
            customerId: req.user.id,
            shippingAddress,
            items,
        });


        res.status(201).json({
            success: true,
            data: order,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};


export const ordersController = {
    createOrder
};
