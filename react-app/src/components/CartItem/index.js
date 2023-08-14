import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import "./CartItem.css";
import OpenModalButton from "../OpenModalButton";
import RemoveCartItem from "../RemoveCartItem";
import {
  cartTotalThunk,
  loadCartThunk,
  updateCartThunk,
} from "../../store/carts";

const fixedPrice = (price) => (+price).toFixed(2);

export default function CartItem({product}) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(product.quantity);
  const [didSubmit, setDidSubmit] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const errorsObj = {};

    if (quantity < 0) errorsObj.quantity = "Quantity must be greater than 0";
    setErrors(errorsObj);
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setDidSubmit(true);
    if (Object.keys(errors).length > 0) {
      return alert("Please enter valid quantity");
    }

    await dispatch(updateCartThunk(product.id, quantity));
    await dispatch(loadCartThunk());
    await dispatch(cartTotalThunk());
  };
  return (
    <div>
      <div>
        <Link to={`/products/${product.id}`}>
          <img src={product?.image} className="cartpro-img" />
          <div>{product.title}</div>
        </Link>

        <div>${fixedPrice(product.quantity * product.price)}</div>
        <div>(${product.price} each)</div>
        <form onSubmit={handleSubmit} className="quant-div">
          <div>
            <label>Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <button type="submit" className="save-quant">
            Save
          </button>
        </form>
      </div>

      <div className="delpro-wrap">
        <OpenModalButton
          modalComponent={<RemoveCartItem product={product} />}
          buttonText="Remove"
        />
      </div>
    </div>
  );
}
