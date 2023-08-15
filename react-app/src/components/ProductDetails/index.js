import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getOneProductThunk, getUserProductsThunk} from "../../store/products";

import "./ProductDetails.css";
import {addToCartThunk, loadCartThunk} from "../../store/carts";
import {loadProductReviewsThunk} from "../../store/reviews";
import OpenModalButton from "../OpenModalButton";
import CreateReview from "../CreateReview";

const fixedPrice = (price) => (+price).toFixed(2);

export default function ProductDetails() {
  const dispatch = useDispatch();
  const {productId} = useParams();

  const product = useSelector((state) => {
    return state.products.singleProduct;
  });

  const userProducts = useSelector((state) => {
    return Object.values(state.products.allProducts);
  });

  const cartItems = useSelector((state) => {
    return Object.values(state.carts.cartProducts);
  });

  const user = useSelector((state) => {
    return state.session.user;
  });

  const reviews = useSelector((state) => {
    return Object.values(state.reviews);
  });

  console.log("USER", user);

  console.log("THE PRODUCT 🎃", product);

  console.log("USERR PRODUCTS 👁️", userProducts);

  console.log("CART ITEMS ⭐️", cartItems);

  console.log("REVIEWS 🤡", reviews);

  const userProductsId = [];

  const cartItemsId = [];

  for (let product of userProducts) {
    userProductsId.push(product.id);
  }

  for (let product of cartItems) {
    cartItemsId.push(product.id);
  }

  const reviewUserIds = [];

  for (let review of reviews) {
    reviewUserIds.push(review.user_id);
  }

  console.log(" 🍊 review user ids", reviewUserIds);

  console.log(" 🍀cart item ids", cartItemsId);

  useEffect(() => {
    dispatch(getOneProductThunk(productId));
    dispatch(getUserProductsThunk());
    dispatch(loadCartThunk());
    dispatch(loadProductReviewsThunk(productId));
  }, [dispatch, productId]);

  const addToCart = async () => {
    if (user === null) {
      return alert("Log in to add this product to your cart!");
    }
    if (userProductsId.includes(product.id)) {
      return alert("You can't add your own product to your cart!");
    } else {
      if (cartItemsId.includes(product.id)) {
        return alert(
          "This product is already in your cart! Please update this product in your cart"
        );
      } else {
        await dispatch(addToCartThunk(product.id));
        await dispatch(loadCartThunk());
        return alert(`${product.title} has been added to your cart!`);
      }
    }
  };

  if (product === null) {
    return <h1>Hold still while we load this amazing product bestie!</h1>;
  }

  return (
    <div className="details-wrap">
      <img src={product.image} className="details-img" />
      <div className="details-info">
        <div className="d-title">{product.title}</div>
        {product && <div className="d-price">${fixedPrice(product.price)}</div>}
        <div className="d-des">{product.description}</div>
        <div className="des-seller">
          <img
            src="https://cdn.discordapp.com/attachments/1138505164358164483/1138930197878550679/daisy.png"
            className="sell-img"
          />
          <div className="sell-user">{product?.creator?.username}</div>
        </div>

        <button className="add-cart" onClick={addToCart}>
          Add to cart
        </button>
      </div>
      <div className="p-rev">
        {user.id !== product.user_id && !reviewUserIds.includes(user.id) && (
          <OpenModalButton
            modalComponent={<CreateReview user={user} productId={product.id} />}
            buttonText="Post Your Review"
          />
        )}
      </div>
    </div>
  );
}
