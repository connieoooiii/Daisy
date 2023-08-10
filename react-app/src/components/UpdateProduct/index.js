import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {useModal} from "../../context/Modal";

import "./UpdateProduct.css";
import {getOneProductThunk, updateProductThunk} from "../../store/products";

const fixedPrice = (price) => (+price).toFixed(2);

export default function UpdateProduct({productId}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const {closeModal} = useModal();

  const user_id = useSelector((state) => state.session.user.id);

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState({});
  const [didSubmit, setDidSubmit] = useState(false);

  useEffect(() => {
    dispatch(getOneProductThunk(productId)).then((product) => {
      setImage(product.image);
      setDescription(product.description);
      setPrice(product.price);
      setTitle(product.title);
    });
  }, [dispatch, productId]);

  useEffect(() => {
    const errorsObj = {};

    if (!image) errorsObj.image = "Image is required";
    if (!title) errorsObj.title = "Title is required";
    if (!price) errorsObj.title = "Please input a price";

    if (title.length > 150 && title.length < 4)
      errorsObj.title = "Title must be between 4 to 150 characters";

    if (description.length > 1000)
      errorsObj.description = "Description must be 1000 characters or less";

    if (isNaN(price)) errorsObj.price = "Please input a number value";
    if (price < 0) errorsObj.price = "Price must be at least 0";

    setErrors(errorsObj);
  }, [image, price, title, description]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setDidSubmit(true);
    if (Object.keys(errors).length > 0) {
      return alert("Please enter valid information to update your product");
    }

    setErrors({});

    const newPrice = fixedPrice(price);

    const updatedProduct = {
      id: productId,
      user_id,
      title,
      description,
      image,
      price: newPrice,
    };

    console.log("INSIDE handle submit update product");
    console.log("updated product", updatedProduct);
    const dispatchedProduct = await dispatch(
      updateProductThunk(updatedProduct)
    );

    setImage("");
    setDescription("");
    setTitle("");
    setPrice("");

    if (dispatchedProduct) closeModal();
  };

  return (
    <div className="updatepro-wrap">
      <form className="updatepro-form" onSubmit={handleSubmit}>
        <div>Update Your Product</div>

        <div>
          <label>Image</label>
          <input
            type="text"
            placeholder="Share an image of this beauty"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        {didSubmit && errors.image && (
          <p className="sign-err">{errors.image}</p>
        )}
        <div>
          <label>Title</label>
          <input
            type="text"
            placeholder="Name this beauty"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {didSubmit && errors.title && (
          <p className="sign-err">{errors.title}</p>
        )}
        <div>
          <label>Description</label>
          <textarea
            type="text"
            placeholder="Describe this beauty"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {didSubmit && errors.description && (
          <p className="sign-err">{errors.description}</p>
        )}
        <div className="money">
          <label>Price</label>
          <div className="cash">$</div>
          <input
            className="price-input"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Set a price for this beauty"
          />
        </div>
        {didSubmit && errors.price && (
          <p className="sign-err">{errors.price}</p>
        )}
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
