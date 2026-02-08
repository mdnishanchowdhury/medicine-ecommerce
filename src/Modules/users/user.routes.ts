import express from "express";
import { userControllers } from "./user.controller";

const router = express.Router();


router.get("/users", userControllers.getUser);
router.get("/users/:id", userControllers.getSingleUser);
router.put("/users/:id", userControllers.putSingleUser);
router.delete("/users/:id", userControllers.deleteSingleUser);

export const userRoutes = router;