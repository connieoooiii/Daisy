import {useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";
import {getSearchedProductsThunk} from "../../store/products";
import ProductCard from "../ProductCard";
import Loadingpage from "../LoadingPage";

export default function Serums() {
  const dispatch = useDispatch();

  const products = useSelector((state) => {
    return Object.values(state.products.searchProducts);
  });
  useEffect(() => {
    dispatch(getSearchedProductsThunk("serum"));
  });

  if (Object.keys(products).length === 0) {
    return <Loadingpage />;
  }
  return (
    <div className="product-card-wrap">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
