import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {getUserProductsThunk} from "../../store/products";

import ProductCard from "../ProductCard";
import OpenModalButton from "../OpenModalButton";
import DeleteProduct from "../DeleteProduct";
import "./ManageProducts.css";
import UpdateProduct from "../UpdateProduct";

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
          <div key={product.id}>
            <ProductCard product={product} />
            <div className="the-buttons">
              <div className="editpro-wrap">
                <OpenModalButton
                  modalComponent={<UpdateProduct product={product} />}
                  buttonText="Update"
                />
              </div>
              <div className="delpro-wrap">
                <OpenModalButton
                  modalComponent={<DeleteProduct productId={product.id} />}
                  buttonText="Delete"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
