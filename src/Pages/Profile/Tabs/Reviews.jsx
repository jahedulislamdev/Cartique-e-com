import React, { useState, useEffect } from 'react';

const Reviews = () => {
   const [reviews, setReviews] = useState([]);

   useEffect(() => {
      // Simulate fetching reviews from an API
      const fetchReviews = async () => {
         const mockReviews = [
            { id: 1, user: 'John Doe', comment: 'This product exceeded my expectations! The quality is top-notch, and I highly recommend it to anyone.', rating: 5 },
            { id: 2, user: 'Jane Smith', comment: 'The delivery was super fast, and the product works perfectly. I am very happy with my purchase.', rating: 4 },
            { id: 3, user: 'Alice Johnson', comment: 'The product is decent, but I feel like it could use some improvements in terms of durability.', rating: 3 },
         ];
         setReviews(mockReviews);
      };

      fetchReviews();
   }, []);

   return (
      <div className="p-6 bg-base-100 rounded-lg shadow-md">
         <h2 className="text-2xl font-bold mb-4">User Reviews</h2>
         {reviews.length > 0 ? (
            <div className="space-y-4">
               {reviews.map((review) => (
                  <div
                     key={review.id}
                     className="p-4 bg-base rounded-lg shadow-sm border border-gray-400"
                  >
                     <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold">{review.user}</h3>
                        <span className="text-yellow-500 font-medium">
                           {review.rating}/5 ⭐
                        </span>
                     </div>
                     <p className="opacity-50">{review.comment}</p>
                  </div>
               ))}
            </div>
         ) : (
            <p className="text-gray-600">No reviews yet. Be the first to leave a review!</p>
         )}
      </div>
   );
};

export default Reviews;