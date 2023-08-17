import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  cartTotalThunk,
  deleteAllCartThunk,
  loadCart,
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
    dispatch(loadCart([]));
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

  if (user && products.length === 0) {
    return (
      <div className="manage-wrap">
        <img
          src="https://cdn.discordapp.com/attachments/1138505164358164483/1141497587921330276/daisy-.jpeg"
          alt="daisy"
          className="daisy-manage"
        />
        <div className="create-first">
          Your shopping cart is empty. Love it? Buy it!
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="manage-wrap">
        <img
          src="https://cdn.discordapp.com/attachments/1138505164358164483/1141497587921330276/daisy-.jpeg"
          alt="daisy"
          className="daisy-manage"
        />
        <div className="create-first">
          Please log in to view your shopping cart!
        </div>
      </div>
    );
  }

  return (
    user && (
      <div className="cart-div">
        <div className="cart-wrap">
          <h1>Shopping Cart</h1>
          {products &&
            sortedProducts.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
        </div>
        <div className="total-box">
          <div>Total: ${fixedPrice(total?.total_price)}</div>
          <button
            onClick={handleCheckout}
            id="proceed-ck"
            className="proceed-ck"
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    )
  );
}
