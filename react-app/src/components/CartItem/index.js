import {Link} from "react-router-dom";

import "./CartItem.css";

export default function CartItem({product}) {
  return (
    <div>
      <div>
        <Link to={`/products/${product.id}`}>
          <img src={product?.image} className="cartpro-img" />
          <div>{product.title}</div>
        </Link>
        <div>Quantity: {product.quantity}</div>
      </div>

      <button>Remove</button>
    </div>
  );
}
