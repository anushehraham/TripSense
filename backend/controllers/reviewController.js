import Review from '../models/Review.js';

// Get all reviews for a specific country
export const getReviewsByCountry = async (req, res) => {
  try {
    const { country } = req.params;
    
    if (!country) {
      return res.status(400).json({
        success: false,
        message: 'Country parameter is required'
      });
    }

    const reviews = await Review.find({ country: country })
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json({
      success: true,
      data: reviews,
      count: reviews.length
    });

  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching reviews',
      error: error.message
    });
  }
};

// Create a new review
export const createReview = async (req, res) => {
  try {
    const { country, user, rating, title, comment } = req.body;

    // Validation
    if (!country || !user || !rating || !title || !comment) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    const review = new Review({
      country,
      user,
      rating,
      title,
      comment
    });

    await review.save();

    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      data: review
    });

  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while creating review',
      error: error.message
    });
  }
};

// Update a review (only by the same user)
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { user, rating, title, comment } = req.body;

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User identification is required'
      });
    }

    const review = await Review.findById(id);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    if (review.user !== user) {
      return res.status(403).json({
        success: false,
        message: 'You can only update your own reviews'
      });
    }

    const updateData = {};
    if (rating !== undefined) updateData.rating = rating;
    if (title !== undefined) updateData.title = title;
    if (comment !== undefined) updateData.comment = comment;

    const updatedReview = await Review.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Review updated successfully',
      data: updatedReview
    });

  } catch (error) {
    console.error('Update review error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while updating review',
      error: error.message
    });
  }
};

// Delete a review (only by the same user)
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req.body;

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User identification is required'
      });
    }

    const review = await Review.findById(id);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    if (review.user !== user) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own reviews'
      });
    }

    await Review.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully'
    });

  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while deleting review',
      error: error.message
    });
  }
};

// Rate a review as helpful or not helpful
export const rateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { helpful } = req.body; // true for helpful, false for not helpful

    if (typeof helpful !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: 'Helpful parameter must be true or false'
      });
    }

    const review = await Review.findById(id);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    if (helpful) {
      review.helpful += 1;
    } else {
      review.notHelpful += 1;
    }

    await review.save();

    res.status(200).json({
      success: true,
      message: 'Review rated successfully',
      data: review
    });

  } catch (error) {
    console.error('Rate review error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while rating review',
      error: error.message
    });
  }
};

// Get review statistics for a country
export const getReviewStats = async (req, res) => {
  try {
    const { country } = req.params;

    const stats = await Review.aggregate([
      { $match: { country: country } },
      {
        $group: {
          _id: null,
          totalReviews: { $sum: 1 },
          averageRating: { $avg: '$rating' },
          ratingDistribution: {
            $push: '$rating'
          }
        }
      }
    ]);

    if (stats.length === 0) {
      return res.status(200).json({
        success: true,
        data: {
          totalReviews: 0,
          averageRating: 0,
          ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
        }
      });
    }

    const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    stats[0].ratingDistribution.forEach(rating => {
      ratingCounts[rating] = (ratingCounts[rating] || 0) + 1;
    });

    res.status(200).json({
      success: true,
      data: {
        totalReviews: stats[0].totalReviews,
        averageRating: Math.round(stats[0].averageRating * 10) / 10,
        ratingDistribution: ratingCounts
      }
    });

  } catch (error) {
    console.error('Get review stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching review statistics',
      error: error.message
    });
  }
};
