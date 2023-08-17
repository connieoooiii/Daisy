import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {useModal} from "../../context/Modal";

import {getOneProductThunk} from "../../store/products";
import {
  loadOneReviewThunk,
  loadProductReviewsThunk,
  updateReviewThunk,
} from "../../store/reviews";

export default function UpdateReview({oldReview, productId, user}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const {closeModal} = useModal();
  const [review, setReview] = useState(oldReview?.review);
  const [errors, setErrors] = useState({});
  const [activeRating, setActiveRating] = useState(oldReview?.stars);
  const [starsRating, setStarsRating] = useState(oldReview?.stars);
  const [didSubmit, setDidSubmit] = useState(false);

  //   useEffect(() => {
  //     dispatch(loadOneReviewThunk(oldReview.id)).then((review) => {
  //       setReview(review.review);
  //       setStarsRating(review.stars);
  //     });
  //   }, [dispatch, oldReview.id]);

  console.log("OlD REVIEW", oldReview);

  useEffect(() => {
    const errorsObj = {};
    if (review.length < 10)
      errorsObj.review = "Your review must be at least 10 characters";

    if (starsRating < 1 || !starsRating)
      errorsObj.starsRating = "Star rating must be at least 1";

    setErrors(errorsObj);
  }, [review, starsRating]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDidSubmit(true);

    if (!Object.keys(errors).length > 0) {
      setErrors({});
      const editReview = {
        id: oldReview.id,
        user_id: user.id,
        product_id: productId,
        review,
        stars: starsRating,
      };

      console.log("😈 right before the thunk gets dispatched");

      const dispatchedReview = await dispatch(
        updateReviewThunk(editReview, oldReview.id)
      );

      console.log("😈 dispatched review", dispatchedReview);

      setReview("");
      setActiveRating(0);
      setStarsRating();

      if (dispatchedReview.id) {
        await dispatch(loadProductReviewsThunk(productId));
        closeModal();
      }
    } else {
      return;
    }
  };

  const disabled = review.length < 10 || starsRating < 1 ? true : null;

  return (
    <div className="rvw-wrap">
      <div className="how-was">How was this product?</div>
      <form className="rev-form" onSubmit={handleSubmit}>
        {didSubmit && (
          <div>
            {errors.dispatchedReview && <p>{errors.dispatchedReview}</p>}
          </div>
        )}
        <div className="revs-div">
          <textarea
            className="leave-rev"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Leave your review here. Must be at least 10 characters and have 1 star!"
          />
        </div>
        {review.length > 0 && review.length < 10 && (
          <div className="sign-err">
            Must be at least 10 characters & one star!
          </div>
        )}

        <div className="text-btn">
          <div className="i-stars">
            <div className="rating-input">
              <div
                className={activeRating >= 1 ? "filled" : "empty"}
                onMouseEnter={() => setActiveRating(1)}
                onMouseLeave={() => setActiveRating(starsRating)}
                onClick={() => setStarsRating(1)}
              >
                <i className="fa-sharp fa-solid fa-star"></i>
              </div>
              <div
                className={activeRating >= 2 ? "filled" : "empty"}
                onMouseEnter={() => setActiveRating(2)}
                onMouseLeave={() => setActiveRating(starsRating)}
                onClick={() => setStarsRating(2)}
              >
                <i className="fa-sharp fa-solid fa-star"></i>
              </div>
              <div
                className={activeRating >= 3 ? "filled" : "empty"}
                onMouseEnter={() => setActiveRating(3)}
                onMouseLeave={() => setActiveRating(starsRating)}
                onClick={() => setStarsRating(3)}
              >
                <i className="fa-sharp fa-solid fa-star"></i>
              </div>
              <div
                className={activeRating >= 4 ? "filled" : "empty"}
                onMouseEnter={() => setActiveRating(4)}
                onMouseLeave={() => setActiveRating(starsRating)}
                onClick={() => setStarsRating(4)}
              >
                <i className="fa-sharp fa-solid fa-star"></i>
              </div>
              <div
                className={activeRating >= 5 ? "filled" : "empty"}
                onMouseEnter={() => setActiveRating(5)}
                onMouseLeave={() => setActiveRating(starsRating)}
                onClick={() => setStarsRating(5)}
              >
                <i className="fa-sharp fa-solid fa-star"></i>
              </div>
            </div>
            <div className="starss">Stars</div>
          </div>

          <button
            type="submit"
            disabled={disabled}
            className={`rvw-btn ${disabled ? "inactive" : ""}`}
            onClick={() => setDidSubmit(true)}
          >
            Submit Your Review
          </button>
        </div>
      </form>
    </div>
  );
}
