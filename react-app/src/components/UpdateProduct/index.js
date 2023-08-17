import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {useModal} from "../../context/Modal";

import "./UpdateProduct.css";
import {getOneProductThunk, updateProductThunk} from "../../store/products";

const fixedPrice = (price) => (+price).toFixed(2);

export default function UpdateProduct({product}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const {closeModal} = useModal();

  const user_id = useSelector((state) => state.session.user.id);

  const [image, setImage] = useState("");
  const [title, setTitle] = useState(product?.title);
  const [description, setDescription] = useState(product?.description);
  const [price, setPrice] = useState(fixedPrice(product?.price));
  const [errors, setErrors] = useState({});
  const [didSubmit, setDidSubmit] = useState(false);

  // useEffect(() => {
  //   dispatch(getOneProductThunk(product.id)).then((product) => {
  //     setDescription(product.description);
  //     // setImage(product.image);
  //     setPrice(fixedPrice(product.price));
  //     setTitle(product.title);
  //   });
  // }, [dispatch, product.id]);

  useEffect(() => {
    const errorsObj = {};

    if (!title) {
      errorsObj.title = "Title is required";
    } else if (title.length < 5 || title.length > 65) {
      errorsObj.title = "Title must be between 5 and 65 characters";
    }

    if (description.length > 1000)
      errorsObj.description = "Description must be 1000 characters or less";

    if (!price) {
      errorsObj.price = "Please input a price";
    } else if (isNaN(price)) {
      errorsObj.price = "Please input a number value";
    } else if (parseFloat(price) < 0 || parseFloat(price) > 200) {
      errorsObj.price = "Price must be between 0 and $200";
    }

    setErrors(errorsObj);
  }, [price, title, description]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setDidSubmit(true);
    if (Object.keys(errors).length > 0) {
      return;
      // return alert("Please enter valid information to update your product");
    }

    setErrors({});

    const newPrice = fixedPrice(price);

    const updatedProduct = {
      id: product.id,
      user_id,
      title,
      description,
      price: newPrice,
    };

    console.log("INSIDE handle submit update product");

    const dispatchedProduct = await dispatch(
      updateProductThunk(updatedProduct)
    );

    setDescription("");
    setTitle("");
    setPrice("");

    if (dispatchedProduct) {
      dispatch(getOneProductThunk(product.id));
      closeModal();
    }
  };

  return (
    <div className="updatepro-wrap">
      <form className="updatepro-form" onSubmit={handleSubmit}>
        <div className="share">Update Your Product</div>

        <div className="pro-div">
          <label className="pro-label">Title</label>
          <input
            className="pro-input"
            type="text"
            placeholder="Name this beauty"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {didSubmit && errors.title && (
          <p className="sign-err">{errors.title}</p>
        )}
        <div className="pro-div">
          <label className="pro-label">Description</label>
          <textarea
            className="des-area"
            type="text"
            placeholder="Describe this beauty"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {didSubmit && errors.description && (
          <p className="sign-err">{errors.description}</p>
        )}
        <div className="pro-div">
          <label className="pro-label">Price</label>
          <div className="money">
            <div className="cash">$</div>
            <input
              className="price-input"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Set a price for this beauty"
            />
          </div>
        </div>
        {didSubmit && errors.price && (
          <p className="sign-err">{errors.price}</p>
        )}
        <button type="submit" className="create-pro-btn">
          Save
        </button>
      </form>
    </div>
  );
}
