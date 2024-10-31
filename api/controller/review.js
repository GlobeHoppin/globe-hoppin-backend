const Review = require('../model/review'); 

// Create a new review
const createReview = async (req, res) => {
    try {
        const {
            name,
            destination,
            reviewDescription,
            tripPlannerHelp,
            recommendationReason,
            ratings
        } = req.body;

        const newReview = new Review({
            name,
            destination,
            reviewDescription,
            tripPlannerHelp,
            recommendationReason,
            ratings,
        });

        const savedReview = await newReview.save();
        res.status(201).json(savedReview);
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all reviews
const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find(); // Assuming the User model has a 'name' field
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get a review by ID
const getReviewById = async (req, res) => {
    try {
        const { reviewId } = req.params;

        const review = await Review.findById(reviewId);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(200).json(review);
    } catch (error) {
        console.error('Error fetching review:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update a review
const updateReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const updates = req.body;

        const updatedReview = await Review.findByIdAndUpdate(reviewId, updates, { new: true });

        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(200).json(updatedReview);
    } catch (error) {
        console.error('Error updating review:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete a review
const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;

        const deletedReview = await Review.findByIdAndDelete(reviewId);

        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    createReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview,
};
