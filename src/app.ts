import express from "express";
import { categoryRouter } from "./Modules/category/category.route";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from 'cors';
import { medicineRouter } from "./Modules/medicine/medicine.route";

const app = express();

app.use(cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true
}))

app.all('/api/auth/*splat', toNodeHandler(auth));
app.use(express.json());

app.use("/category", categoryRouter);
app.use("/api", medicineRouter);

app.get("/", (req, res) => {
    res.send("Hello Word!");
})

export default app;