import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

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
      {reviews.map((review) => (
        <div key={review.id}>
          <div>{review.review}</div>
          <div className="name-date">
            <div className="person-rev">{review.creator.first_name}</div>
            <div className="the-date">{formatDate(review.created_at)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
