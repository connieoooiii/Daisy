import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {getUserProductsThunk} from "../../store/products";

import ProductCard from "../ProductCard";
import OpenModalButton from "../OpenModalButton";
import DeleteProduct from "../DeleteProduct";
import "./ManageProducts.css";
import UpdateProduct from "../UpdateProduct";
import CreateProduct from "../CreateProduct";

export default function ManageProducts() {
  const dispatch = useDispatch();
  const history = useHistory();

  const products = useSelector((state) => {
    return Object.values(state.products.allProducts);
  });

  const user = useSelector((state) => {
    return state.session.user;
  });

  console.log("PRODUCTS 👁️", products);

  useEffect(() => {
    dispatch(getUserProductsThunk());
  }, [dispatch]);

  if (user && products.length < 1) {
    return (
      <div className="manage-wrap">
        <img
          src="https://cdn.discordapp.com/attachments/1138505164358164483/1141497587921330276/daisy-.jpeg"
          alt="daisy"
          className="daisy-manage"
        />
        <div className="man-div">
          <div className="create-first">Create your first product!</div>
          <div className="man-create">
            <OpenModalButton
              modalComponent={<CreateProduct />}
              buttonText="Create A Product"
            />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="manage-wrap">
        <img
          src="https://cdn.discordapp.com/attachments/1138505164358164483/1141497587921330276/daisy-.jpeg"
          alt="daisy"
          className="daisy-manage"
        />
        <div className="create-first">
          Please log in to manage your products!
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="manage-card-wrap">
        {products.map((product) => (
          <div key={product.id} className="edit-pro">
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
