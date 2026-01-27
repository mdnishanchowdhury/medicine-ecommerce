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

const getMyOrders = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const customerId = req.user.id;
        const orders = await ordersService.getMyOrders(customerId);

        res.status(200).json({
            success: true,
            data: orders,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getOrderById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order id",
            });
        }

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const order = await ordersService.getOrderById(id, req.user.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        res.status(200).json({
            success: true,
            data: order,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getSellerOrders = async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const orders = await ordersService.getSellerOrders();

        res.status(200).json({
            success: true,
            data: orders,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



export const ordersController = {
    createOrder,
    getMyOrders,
    getOrderById,
    getSellerOrders
};
