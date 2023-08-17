import {useDispatch} from "react-redux";
import {useModal} from "../../context/Modal";
import {deleteReviewThunk, loadProductReviewsThunk} from "../../store/reviews";
import {getOneProductThunk} from "../../store/products";

import "./DeleteReview.css";

export default function DeleteReview({reviewId, productId}) {
  const dispatch = useDispatch();
  const {closeModal} = useModal();

  const deleteHandler = async (e) => {
    e.preventDefault();

    await dispatch(deleteReviewThunk(productId, reviewId));
    await dispatch(loadProductReviewsThunk(productId));
    await dispatch(getOneProductThunk(productId));

    closeModal();
  };
  return (
    <div className="del-rev-wrap">
      <h2>Confirm Delete</h2>
      <p className="are-you">Are you sure you want to delete this review?</p>
      <div className="del-btns">
        <button className="yes-del" onClick={deleteHandler}>
          Confirm
        </button>
        <button className="no-del" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
}
