import express from "express";
import { categoryRouter } from "./modules/category/category.route";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from 'cors';
import { medicineRouter } from "./modules/medicine/medicine.route";
import { orderRouter } from "./modules/order/order.route";
import { notFount } from "./middlewares/notFount";
import errorHandler from "./middlewares/globalErrorHandler";
import { reviewRouter } from "./modules/review/review.route";
import { userRoutes } from "./modules/users/user.routes";

const app = express();

app.use(cors({
    origin: process.env.APP_URL,
    credentials: true
}))

app.all('/api/auth/*splat', toNodeHandler(auth));

app.use(express.json());

app.use("/category", categoryRouter);

app.use("/api", medicineRouter);

app.use("/api", orderRouter);
app.use("/api", reviewRouter);
app.use("/api", userRoutes);

app.get("/", (req, res) => {
    res.send("Hello Word!");
})

app.use(notFount)
app.use(errorHandler)
export default app;