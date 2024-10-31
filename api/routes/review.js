import Express from "express";
import {
    createReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview,
} from "../controller/review"; // Adjust the path as necessary

const ReviewRouter = new Express.Router();

ReviewRouter.post("/reviews", createReview);           // Create a new review
ReviewRouter.get("/reviews", getAllReviews);           // Get all reviews
ReviewRouter.get("/reviews/:reviewId", getReviewById); // Get a review by ID
ReviewRouter.put("/reviews/:reviewId", updateReview);  // Update a review
ReviewRouter.delete("/reviews/:reviewId", deleteReview);// Delete a review

export default ReviewRouter;
