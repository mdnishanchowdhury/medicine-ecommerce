import { Router } from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { reviewController } from "./review.controller";

const router = Router();

router.get("/review/:reviewId", reviewController.getReviewById);
router.get("/review/:customerId", reviewController.getReviewsByAuthor);

router.post("/review", auth(UserRole.CUSTOMER), reviewController.createReview);


export const reviewRouter = router;
