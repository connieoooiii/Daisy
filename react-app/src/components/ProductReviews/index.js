import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import OpenModalButton from "../OpenModalButton";
import DeleteReview from "../DeleteReview";
import UpdateReview from "../UpdateReview";

import "./ProductReviews.css";
import {loadProductReviewsThunk} from "../../store/reviews";

export default function ProductReviews({productId, user, review}) {
  const dispatch = useDispatch();

  // const reviews = useSelector((state) => {
  //   return Object.values(state.reviews.allReviews);
  // });

  console.log("REVIEW 🐳 in the product reviews comp", review);

  // useEffect(() => {
  //   loadProductReviewsThunk(productId);
  // });

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

  if (!review) {
    return (
      <div className="manage-wrap">
        <img
          src="https://cdn.discordapp.com/attachments/1138505164358164483/1141497587921330276/daisy-.jpeg"
          alt="daisy"
          className="daisy-manage"
        />
        <div className="create-first">Getting product reviews!</div>
      </div>
    );
  }

  return (
    <div className="review-card">
      <div>{renderStarIcons(review.stars)}</div>
      <div>{review.review}</div>
      <div className="name-date">
        <div className="person-rev">{review?.creator.first_name}</div>
        <div className="the-date">
          {review && formatDate(review.created_at)}
        </div>
      </div>
      {user && review.user_id === user.id && (
        <div className="my-reviews">
          <div className="my-del">
            <OpenModalButton
              modalComponent={
                <DeleteReview reviewId={review.id} productId={productId} />
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
  );
}

/* {reviews
        .map((review) => (
          <div key={review.id}>
            <div>{renderStarIcons(review.stars)}</div>
            <div>{review.review}</div>
            <div className="name-date">
              <div className="person-rev">{review?.creator.first_name}</div>
              <div className="the-date">
                {review && formatDate(review.created_at)}
              </div>
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
        .reverse()} */
