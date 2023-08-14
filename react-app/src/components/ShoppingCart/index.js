import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {carTotalThunk, loadCartThunk} from "../../store/carts";
import CartItem from "../CartItem";

import "./ShoppingCart.css";

const fixedPrice = (price) => (+price).toFixed(2);

export default function ShoppingCart() {
  const dispatch = useDispatch();
  const products = useSelector((state) => {
    return Object.values(state.carts.cartProducts);
  });

  const total = useSelector((state) => {
    return state.carts.total;
  });

  console.log("🍿 total", total);

  console.log("🍙  cart products", products);

  useEffect(() => {
    dispatch(loadCartThunk());
    dispatch(carTotalThunk());
  }, [dispatch]);

  if (!products) return null;

  return (
    <div className="cart-div">
      <div className="cart-wrap">
        {products.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}
      </div>
      <div className="total-box">Total: {fixedPrice(total.total_price)}</div>
    </div>
  );
}
