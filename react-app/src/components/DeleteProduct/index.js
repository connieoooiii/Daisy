import {useDispatch} from "react-redux";
import {useModal} from "../../context/Modal";
import {deleteProductThunk} from "../../store/products";

import "./DeleteProduct.css";

export default function DeleteProduct({productId}) {
  const dispatch = useDispatch();
  const {closeModal} = useModal();

  const deleteHandler = async () => {
    await dispatch(deleteProductThunk(productId));
    closeModal();
  };

  return (
    <div className="delete-wrap">
      <h2 className="confirm-del">Remove Product</h2>
      <p>Are you sure you want to remove this product?</p>
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
