const mongoose = require('mongoose');

// Define the Review Schema
const reviewSchema = new mongoose.Schema({
    name: {
        type: String, // Assuming you're using MongoDB with ObjectIDs
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    reviewDescription: {
        type: String,
        required: true,
        maxlength: 300, // Set a max length for the description
    },
    tripPlannerHelp: {
        type: String,
        maxlength: 250,
    },
    recommendationReason: {
        type: String,
        maxlength: 250, // Optional reason for recommendation
    },
    ratings: {
        overallExperience: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        planningProcess: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        activities: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
    },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt timestamps

// Create the Review Model
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
