import {useSelector} from "react-redux";
import ProductCard from "../ProductCard";

export default function Search() {
  const products = useSelector((state) => {
    return Object.values(state.products.searchProducts);
  });

  console.log("🧲 search products", products);

  if (products.length === 0) {
    return (
      <div className="pg-not">
        <div className="bummer">
          Sorry no products found
          <i class="fa-regular fa-face-frown" id="sad"></i>
        </div>
      </div>
    );
  }
  return (
    <div className="product-card-wrap">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
