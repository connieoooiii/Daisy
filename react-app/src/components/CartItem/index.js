import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import "./CartItem.css";
import OpenModalButton from "../OpenModalButton";
import RemoveCartItem from "../RemoveCartItem";
import {
  cartTotalThunk,
  deleteCartProductThunk,
  loadCartThunk,
  updateCartThunk,
} from "../../store/carts";
import {getOneProductThunk} from "../../store/products";

const fixedPrice = (price) => (+price).toFixed(2);

export default function CartItem({product}) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState("");
  const [didSubmit, setDidSubmit] = useState(false);
  const [errors, setErrors] = useState({});

  console.log("PRODUCT 🐼", product);

  useEffect(() => {
    const errorsObj = {};

    if (quantity < 0) errorsObj.quantity = "Quantity must be greater than 0";
    setErrors(errorsObj);
  }, [quantity]);

  useEffect(() => {
    setQuantity(product.quantity);
  }, [product.quantity]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setDidSubmit(true);
    console.log("errors", errors);

    if (Object.keys(errors).length > 0) {
      return;
      // return alert("The quantity is not valid.");
    }

    if (+quantity === 0) {
      console.log("i am inside if quantity 0");
      await dispatch(deleteCartProductThunk(product.id));
      //   await dispatch(loadCartThunk());
      await dispatch(cartTotalThunk());
    } else {
      await dispatch(updateCartThunk(product.id, quantity));
      await dispatch(loadCartThunk());
      await dispatch(cartTotalThunk());
    }
  };
  return (
    <div>
      <div>
        <Link to={`/products/${product.id}`}>
          <img
            src={product?.image}
            className="cartpro-img"
            alt="product image"
          />
          <div>{product.title}</div>
        </Link>

        <div>${fixedPrice(product.quantity * product.price)}</div>
        <div>(${fixedPrice(product.price)} each)</div>
        <form onSubmit={handleSubmit} className="quant-div">
          <div>
            <label>Quantity</label>
            <input
              className="price-input"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          {didSubmit && errors.quantity && (
            <p className="sign-err">{errors.quantity}</p>
          )}
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
