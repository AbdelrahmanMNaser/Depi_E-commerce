import React from "react";

const Reviews = ({ reviews }) => {
  const calculateRatingDistribution = () => {
    const totalReviews = reviews.length;
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    reviews.forEach((review) => {
      distribution[review.rating] += 1;
    });

    // Convert counts to percentages
    for (let rating in distribution) {
      distribution[rating] = (distribution[rating] / totalReviews) * 100;
    }

    return distribution;
  };

  const ratingDistribution = calculateRatingDistribution();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
      <div className="flex space-x-8">
        {/* Rating Distribution */}
        <div className="w-1/3">
          <p className="text-sm text-gray-500">
            Based on {reviews.length} reviews
          </p>
          <div className="mt-4">
            {Object.keys(ratingDistribution)
              .reverse()
              .map((star) => (
                <div key={star} className="flex items-center space-x-2 mb-2">
                  <span className="text-yellow-500 font-bold">
                    {star} stars
                  </span>
                  <div className="w-40 bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-yellow-500 h-2.5 rounded-full"
                      style={{ width: `${ratingDistribution[star]}%` }}
                    />
                  </div>
                  <span className="text-gray-500">
                    {ratingDistribution[star].toFixed(2)}%
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="w-2/3 space-y-6">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white shadow rounded-lg p-4">
              <div className="mb-2">
                <h3 className="text-lg font-bold">{review.user}</h3>
                <div className="flex items-center">
                  {Array(review.rating)
                    .fill(0)
                    .map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.286a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.286c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.84-.197-1.54-1.118l1.07-3.286a1 1 0 00-.364-1.118L2.88 8.713c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.95-.69l1.07-3.286z" />
                      </svg>
                    ))}
                </div>
              </div>
              <p className="text-gray-700">{review.reviewText}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
