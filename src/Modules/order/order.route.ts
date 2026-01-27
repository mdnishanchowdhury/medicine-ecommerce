import { Router } from "express";
import { ordersController } from "./order.controller";
import auth, { UserRole } from "../../middlewares/auth";

const router = Router();

router.post("/orders", auth(UserRole.CUSTOMER), ordersController.createOrder);

export const orderRouter = router;
