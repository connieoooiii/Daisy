import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getOneProductThunk} from "../../store/products";

import "./ProductDetails.css";

export default function ProductDetails() {
  const dispatch = useDispatch();
  const {productId} = useParams();

  const product = useSelector((state) => {
    return state.products.singleProduct;
  });

  console.log("THE PRODUCT 🎃", product);

  useEffect(() => {
    dispatch(getOneProductThunk(productId));
  }, [dispatch, productId]);

  if (!product) return null;
  return (
    <div className="details-wrap">
      <img src={product.image} className="details-img" />
      <div className="details-info">
        <div className="d-title">{product.title}</div>
        <div className="d-price">${product.price}</div>
        <div className="d-des">{product.description}</div>
        <div className="des-seller">
          <img
            src="https://cdn.discordapp.com/attachments/1138505164358164483/1138930197878550679/daisy.png"
            className="sell-img"
          />
          <div className="sell-user">{product?.creator?.username}</div>
        </div>
        <button className="add-cart">Add to cart</button>
      </div>
    </div>
  );
}
