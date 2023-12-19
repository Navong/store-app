// components/ProductReviews.tsx
'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';

interface Review {
  id: number;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface ProductReviewsProps {
  productId: number;
  initialReviews: Review[];
}

export default function ProductReviews({ productId, initialReviews }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Call the API to submit a new review
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          rating: newReview.rating,
          comment: newReview.comment,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to submit review');
      }

      const newSubmittedReview: Review = await response.json();

      // Update the reviews state with the newly submitted review
      setReviews([newSubmittedReview, ...reviews]);

      // Reset the form
      setNewReview({ rating: 5, comment: '' });
    } catch (error) {
      console.error('Error submitting review:', error);
      if (error instanceof Error) {
        alert(error.message || 'An error occurred while submitting your review.');
      } else {
        alert('An error occurred while submitting your review.');
      }
    }
  };


  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

      {/* Review Form */}
      <form onSubmit={handleSubmitReview} className="mb-8 bg-white p-4 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block mb-2">Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setNewReview({ ...newReview, rating: star })}
                className={`${star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
              >
                <Star fill={star <= newReview.rating ? 'currentColor' : 'none'} />
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Comment</label>
          <textarea
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            className="w-full p-2 border rounded"
            rows={4}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit Review
        </button>
      </form>

      {/* Reviews List */}
      <div className="space-y-4 shadow-lg">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                    />
                  ))}
                </div>
                <span className="font-semibold">{review.userName}</span>
              </div>
              <span className="text-gray-500 text-sm">
                {new Date(review.date).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}