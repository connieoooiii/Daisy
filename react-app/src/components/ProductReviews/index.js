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

  function renderStarIcons(avgStars) {
    const fullStars = Math.floor(avgStars);
    const halfStars = Math.ceil(avgStars - fullStars);

    const starIcons = [];

    for (let i = 0; i < fullStars; i++) {
      starIcons.push(
        <i key={`full-star-${i}`} className="fa-sharp fa-solid fa-star"></i>
      );
    }

    if (halfStars > 0) {
      starIcons.push(
        <i key="half-star" className="fa-sharp fa-solid fa-star-half"></i>
      );
    }

    return starIcons;
  }

  return (
    <div>
      {reviews
        .map((review) => (
          <div key={review.id}>
            <div>{renderStarIcons(review.stars)}</div>
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
                    modalComponent={
                      <UpdateReview
                        oldReview={review}
                        productId={productId}
                        user={user}
                      />
                    }
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
