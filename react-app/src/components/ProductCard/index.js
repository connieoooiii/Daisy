import {Link} from "react-router-dom";
import "./ProductCard.css";

const fixedPrice = (price) => (+price).toFixed(2);

export default function ProductCard({product}) {
  console.log("THIS IS A PRODUCT 👻", product);
  return (
    <div className="card-wrap">
      <Link to={`/products/${product.id}`}>
        <img src={product?.image} className="product-img" />
        <div className="card-info">
          <div className="product-title">{product.title}</div>
          <div className="p-price">${fixedPrice(product.price)}</div>
          <div className="seller">
            <img
              src="https://cdn.discordapp.com/attachments/1138505164358164483/1138930197878550679/daisy.png?ex=660dba67&is=65fb4567&hm=933cae9d9d3d6b3e62cff1b3a810ceb027c5c0933ed571dc4ca3353cc21fe356&"
              className="sell-img"
            />
            <div className="sell-user">{product?.creator?.username}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}
