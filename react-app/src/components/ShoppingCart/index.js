import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  cartTotalThunk,
  deleteAllCartThunk,
  loadCartThunk,
} from "../../store/carts";
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

  const user = useSelector((state) => {
    return state.session.user;
  });

  console.log("🍿 total", total);

  console.log("🍙  cart products", products);

  useEffect(() => {
    dispatch(loadCartThunk());
    dispatch(cartTotalThunk());
  }, [dispatch]);

  const handleCheckout = async () => {
    await dispatch(deleteAllCartThunk(products));
    // dispatch(loadCartThunk());
  };

  // Sort the products by created_at in descending order
  const sortedProducts = [...products].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  if (products.length === 0) return null;

  // if (!total) total.total_price = 0;

  return user ? (
    <div className="cart-div">
      <div className="cart-wrap">
        <h1>Shopping Cart</h1>
        {sortedProducts.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}
      </div>
      <div className="total-box">
        <div>Total: ${fixedPrice(total?.total_price)}</div>
        <button onClick={handleCheckout}>Proceed to checkout</button>
      </div>
    </div>
  ) : (
    <div>Please log in!</div>
  );
}
