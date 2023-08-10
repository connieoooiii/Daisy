import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {addProductThunk} from "../../store/products";

const fixedPrice = (price) => (+price).toFixed(2);

export default function CreateProduct() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState({});
  const [didSubmit, setDidSubmit] = useState(false);

  //   const userId = useSelector((state) => state.session.user.id);

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
      return alert("Please enter valid information to create your product");
    }

    const newPrice = fixedPrice(price);

    console.log("I am in handle submit there are no errors");
    const newProduct = {
      title,
      description,
      image,
      price: newPrice,
    };

    const dispatchedProduct = await dispatch(addProductThunk(newProduct));

    console.log("🤠 dispatched product", dispatchedProduct);

    setImage("");
    setPrice("");
    setTitle("");
    setDescription("");

    if (dispatchedProduct) history.push(`/products/${dispatchedProduct.id}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <div>Share your product with the world</div>
          <div>We can't wait to give it a try</div>
        </div>
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
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
