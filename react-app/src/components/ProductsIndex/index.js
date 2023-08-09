import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllProductsThunk} from "../../store/products";
import ProductCard from "../ProductCard";

import "./ProductsIndex.css";

export default function ProductsIndex() {
  const dispatch = useDispatch();
  const products = useSelector((state) => {
    return Object.values(state.products.allProducts);
  });

  console.log("PRODUCTS 👁️", products);

  useEffect(() => {
    dispatch(getAllProductsThunk());
  }, [dispatch]);

  if (!products) return null;

  return (
    <div className="product-card-wrap">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
