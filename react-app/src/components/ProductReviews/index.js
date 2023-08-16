import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import OpenModalButton from "../OpenModalButton";
import DeleteReview from "../DeleteReview";
import UpdateReview from "../UpdateReview";

import "./ProductReviews.css";

export default function ProductReviews({productId, reviews, user}) {
  const dispatch = useDispatch();

  console.log("REVIEWS 🤡", reviews);

  function formatDate(dateString) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = date.toLocaleString("default", {month: "long"});
    const day = date.getDate();

    return `${month} ${day}, ${year}`;
  }

  return (
    <div>
      {reviews
        .map((review) => (
          <div key={review.id}>
            <div>{review.review}</div>
            <div className="name-date">
              <div className="person-rev">{review.creator.first_name}</div>
              <div className="the-date">{formatDate(review.created_at)}</div>
            </div>
            {review.user_id === user.id && (
              <div className="my-reviews">
                <div className="my-del">
                  <OpenModalButton
                    modalComponent={
                      <DeleteReview
                        reviewId={review.id}
                        productId={productId}
                      />
                    }
                    buttonText="Delete Review"
                  />
                </div>
                <div className="my-del">
                  <OpenModalButton
                    modalComponent={<UpdateReview review={review} />}
                    buttonText="Update Review"
                  />
                </div>
              </div>
            )}
          </div>
        ))
        .reverse()}
    </div>
  );
}
