import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams, useHistory} from "react-router-dom";
import {getOneProductThunk, getUserProductsThunk} from "../../store/products";

import "./ProductDetails.css";
import {
  addToCartThunk,
  loadCartThunk,
  productAlreadyInThunk,
} from "../../store/carts";
import {loadProductReviewsThunk, loadReviews} from "../../store/reviews";
import OpenModalButton from "../OpenModalButton";
import CreateReview from "../CreateReview";
import ProductReviews from "../ProductReviews";
import UpdateProduct from "../UpdateProduct";

const fixedPrice = (price) => (+price).toFixed(2);

export default function ProductDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
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
    return Object.values(state.reviews.allReviews);
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
    dispatch(loadReviews([]));

    dispatch(getOneProductThunk(productId));
    dispatch(loadProductReviewsThunk(productId));
    dispatch(getUserProductsThunk());
    dispatch(loadCartThunk());
  }, [dispatch, productId]);

  // useEffect(() => {
  //   dispatch(loadProductReviewsThunk(productId));
  // }, [dispatch, productId]);

  const addToCart = async () => {
    if (user === null) {
      return alert("Log in to add this product to your cart!");
    }
    if (userProductsId.includes(product.id)) {
      return alert("You can't add your own product to your cart!");
    } else {
      if (cartItemsId.includes(product.id)) {
        await dispatch(productAlreadyInThunk(product.id));
        await dispatch(loadCartThunk());
        history.push("/shopping-cart");
      } else {
        await dispatch(addToCartThunk(product.id));
        await dispatch(loadCartThunk());
        history.push("/shopping-cart");
      }
    }
  };

  function renderStarIcons(avgStars) {
    const fullStars = Math.floor(avgStars);
    const halfStars = Math.ceil(avgStars - fullStars);

    const starIcons = [];

    for (let i = 0; i < fullStars; i++) {
      starIcons.push(
        <i
          key={`full-star-${i}`}
          className="fa-sharp fa-solid fa-star"
          id="avg-stars"
        ></i>
      );
    }

    if (halfStars > 0) {
      starIcons.push(
        <i
          key="half-star"
          className="fa-sharp fa-solid fa-star-half"
          id="avg-stars"
        ></i>
      );
    }

    return starIcons;
  }

  const stars = renderStarIcons(product?.avg_stars);

  if (Object.keys(product).length === 0) {
    return <h1>Hold still while we load this amazing product bestie!</h1>;
  }

  return (
    <div className="details-wrap">
      <img src={product?.image} className="details-img" />
      <div className="details-info">
        <div className="d-title">{product?.title}</div>
        {product && <div className="d-price">${fixedPrice(product.price)}</div>}
        <div className="d-des">{product?.description}</div>
        <div className="des-seller">
          <img
            src="https://cdn.discordapp.com/attachments/1138505164358164483/1138930197878550679/daisy.png"
            className="sell-img"
          />
          <div className="sell-user">{product?.creator?.username}</div>
        </div>

        {user && !userProductsId.includes(product.id) && (
          <button className="add-cart" onClick={addToCart}>
            Add to cart
          </button>
        )}

        {user && userProductsId.includes(product.id) && (
          <div className="prod-edit">
            <OpenModalButton
              modalComponent={<UpdateProduct product={product} />}
              buttonText="Update Your Product"
            />
          </div>
        )}
      </div>
      <div className="review-wrap">
        <div className="r-wrap">
          <div className="num-rev">
            {reviews.length === 0 ? "New" : ""}
            {reviews.length === 1 ? <span>{reviews.length} Review</span> : ""}
            {reviews.length > 1 ? <span>{reviews.length} Reviews</span> : ""}
          </div>
          <div>{stars}</div>
        </div>
        <div className="p-rev">
          {user &&
            user?.id !== product.user_id &&
            !reviewUserIds.includes(user?.id) && (
              <div className="post-review">
                <OpenModalButton
                  modalComponent={
                    <CreateReview user={user} productId={product.id} />
                  }
                  buttonText="Post Your Review"
                />
              </div>
            )}
        </div>
        <ProductReviews productId={product.id} reviews={reviews} user={user} />
      </div>
    </div>
  );
}
