import {useDispatch} from "react-redux";
import {useModal} from "../../context/Modal";
import {
  cartTotalThunk,
  deleteCartProductThunk,
  loadCartThunk,
} from "../../store/carts";

export default function RemoveCartItem({product}) {
  const dispatch = useDispatch();
  const {closeModal} = useModal();

  const deleteHandler = async () => {
    await dispatch(deleteCartProductThunk(product.id));
    await dispatch(cartTotalThunk());
    closeModal();
  };

  return (
    <div className="delete-wrap">
      <h2 className="confirm-del">Remove Product</h2>
      <p>Are you sure you want to remove {product.title} from your cart?</p>
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
