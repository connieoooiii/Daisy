/** Action Type Constants: */
const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";

const LOAD_ONE_REVIEW = "reviews/LOAD_ONE_REVIEW";

const DELETE_REVIEW = "reviews/DELETE_REVIEWS";

const CREATE_REVIEW = "reviews/CREATE_REVIEWS";

const UPDATE_REVIEW = "reviews/UPDATE_REVIEWS";

/**  Action Creators: */
export const loadReviews = (reviews) => ({
  type: LOAD_REVIEWS,
  reviews,
});

export const loadOneReview = (review) => ({
  type: LOAD_REVIEWS,
  review,
});

export const deleteReview = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    reviewId,
  };
};

export const createReview = (review) => {
  return {
    type: CREATE_REVIEW,
    review,
  };
};

export const updateReview = (review) => ({
  type: UPDATE_REVIEW,
  review,
});

/** Thunk Action Creators: */
export const loadProductReviewsThunk = (productId) => async (dispatch) => {
  console.log("I AM BEFORE RES LOAD REVIEWS");
  try {
    const res = await fetch(`/api/products/${productId}/reviews`);
    if (res.ok) {
      const reviews = await res.json();
      dispatch(loadReviews(reviews));
      return reviews;
    } else {
      const errors = await res.json();
      return errors;
    }
  } catch (err) {
    return err;
  }
};

export const loadOneReviewThunk = (reviewId) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${reviewId}`);

  if (res.ok) {
    const review = await res.json();
    dispatch(loadOneReview(review));
    return review;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const deleteReviewThunk = (productId, reviewId) => async (dispatch) => {
  const res = await fetch(`/api/reviews/product/${productId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    const review = await res.json();
    dispatch(deleteReview(reviewId));
    return review;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const createReviewThunk = (productId, review) => async (dispatch) => {
  try {
    console.log("I AM BEFORE RES");
    const res = await fetch(`/api/products/${productId}/reviews`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(review),
    });

    if (res.ok) {
      console.log("I AM AFTER RES");
      const newReview = await res.json();
      dispatch(createReview(newReview));
      return newReview;
    }
  } catch (err) {
    return err;
  }
};

export const updateReviewThunk = (review, reviewId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/reviews/${reviewId}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(review),
    });
    if (res.ok) {
      console.log("I AM AFTER RES");
      const editReview = await res.json();
      dispatch(updateReview(editReview));
      return editReview;
    }
  } catch (err) {
    return err;
  }
};
/** Reviews Reducer: */
const initialState = {allReviews: {}, singleReview: {}};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS: {
      const reviewsState = {};
      action.reviews.forEach((review) => {
        reviewsState[review.id] = review;
      });
      return {
        ...state,
        allReviews: reviewsState,
        singleReview: {},
      };
    }
    case LOAD_ONE_REVIEW: {
      const reviewsState = {...state};
      reviewsState.singleReview = action.review;
      return reviewsState;
    }
    case DELETE_REVIEW: {
      const newState = {
        ...state,
        allReviews: {...state.allReviews},
        singleReview: {...state.singleReview},
      };
      delete newState.allReviews[action.reviewId];
      delete newState.singleReview[action.reviewId];
      return newState;
      // const newState = {...state};
      // delete newState[action.reviewId];
      // return newState;
    }
    case CREATE_REVIEW: {
      return {
        ...state,
        allReviews: {
          ...state.allReviews,
          [action.review.id]: action.review,
        },
      };
    }
    case UPDATE_REVIEW: {
      return {
        ...state,
        allReviews: {
          ...state.allReviews,
          [action.review.id]: action.review,
        },
      };
    }
    default:
      return state;
  }
};

export default reviewReducer;
