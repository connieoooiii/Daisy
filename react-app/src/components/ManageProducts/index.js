import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {getUserProductsThunk} from "../../store/products";

import ProductCard from "../ProductCard";

export default function ManageProducts() {
  const dispatch = useDispatch();
  const history = useHistory();

  const products = useSelector((state) => {
    return Object.values(state.products.allProducts);
  });

  console.log("PRODUCTS 👁️", products);

  useEffect(() => {
    dispatch(getUserProductsThunk());
  }, [dispatch]);

  if (!products) return null;

  return (
    <div>
      <div className="product-card-wrap">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
