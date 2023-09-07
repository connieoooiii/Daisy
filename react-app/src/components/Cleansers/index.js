import {useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";
import {getSearchedProductsThunk} from "../../store/products";
import ProductCard from "../ProductCard";

export default function Cleansers() {
  const dispatch = useDispatch();

  const products = useSelector((state) => {
    return Object.values(state.products.searchProducts);
  });
  useEffect(() => {
    dispatch(getSearchedProductsThunk("clean"));
  });
  return (
    <div className="product-card-wrap">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
