import { Router } from "express";
import { ordersController } from "./order.controller";
import auth, { UserRole } from "../../middlewares/auth";

const router = Router();

router.get("/orders", auth(UserRole.CUSTOMER), ordersController.getMyOrders);
router.get("/orders/:id", auth(UserRole.CUSTOMER), ordersController.getOrderById);

router.post("/orders", auth(UserRole.CUSTOMER), ordersController.createOrder);

// Seller
router.get("/seller/orders", auth(UserRole.SELLER), ordersController.getSellerOrders);

export const orderRouter = router;
