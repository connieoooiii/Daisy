import {useEffect, useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {addProductThunk} from "../../store/products";
import {useModal} from "../../context/Modal";

import "./CreateProduct.css";

const fixedPrice = (price) => (+price).toFixed(2);

export default function CreateProduct() {
  const dispatch = useDispatch();
  const history = useHistory();
  const {closeModal} = useModal();

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState({});
  const [didSubmit, setDidSubmit] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [noPicture, setNoPicture] = useState(false);
  const uploadInput = useRef();

  useEffect(() => {
    const errorsObj = {};

    if (!image)
      errorsObj.image =
        "Image is required. Allowed formats: pdf, png, jpg, jpeg, gif ";

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
    } else if (parseFloat(price) < 0) {
      errorsObj.price = "Price must be at least 0";
    }

    setErrors(errorsObj);
  }, [image, price, title, description]);

  const prevPhoto = async ({currentTarget}) => {
    if (currentTarget.files[0]) {
      //checks if file has been selected
      setImage(currentTarget.files[0]);
      const fileReader = new FileReader(); //creates a new file reader object
      fileReader.readAsDataURL(currentTarget.files[0]);
      //reads file as data URL, used to display images
      fileReader.onload = () => setPhotoUrl(fileReader.result);
      //when file has been read, sets photo url to it
      setNoPicture(false);
    }
  };

  // const handleImageChange = (file) => {
  //   if (file) {
  //     const allowedExtensions = ["pdf", "png", "jpg", "jpeg", "gif"];
  //     const fileExtension = file.name.split(".").pop().toLowerCase();

  //     if (allowedExtensions.includes(fileExtension)) {
  //       setImage(file);
  //     } else {
  //       setImage(null);
  //     }
  //   }
  // };

  let preview = null;
  if (photoUrl) preview = <img src={photoUrl} id="prev-img" alt="" />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setDidSubmit(true);
    if (Object.keys(errors).length > 0) {
      return alert("Please enter valid information to create your product");
    }

    const newPrice = fixedPrice(price);

    const formData = new FormData();

    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", newPrice);

    console.log("I am in handle submit there are no errors");

    const dispatchedProduct = await dispatch(addProductThunk(formData));

    console.log("🤠 dispatched product", dispatchedProduct);

    setImage("");
    setPrice("");
    setTitle("");
    setDescription("");

    if (dispatchedProduct) {
      closeModal();
      history.push(`/products/${dispatchedProduct.id}`);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="product-form"
      >
        <div className="top-div">
          <div className="share">Share your product with the world</div>
          <div className="try">We can't wait to give it a try</div>
        </div>

        <div className="form-container">
          <div className="another">
            <div
              id="pic-side"
              className={noPicture ? "no-picture" : ""}
              onClick={() => uploadInput.current.click()}
            >
              <input
                className="uploadButton"
                id="image"
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/gif"
                onChange={prevPhoto}
                ref={uploadInput}
                style={{display: "none"}}
              />
              {preview || (
                <div
                  id="upload-sign-box-text"
                  className={noPicture ? "no-picture" : ""}
                >
                  <i className="fa-solid fa-upload"></i>
                  <div>
                    {!noPicture
                      ? "Click to upload."
                      : "An Image is required to create a Pin."}
                  </div>
                </div>
              )}
            </div>

            {didSubmit && errors.image && (
              <p className="sign-err">{errors.image}</p>
            )}
          </div>

          <div className="text-side">
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
          </div>
        </div>

        <button type="submit" className="create-pro-btn">
          Create
        </button>
      </form>
    </div>
  );
}

{
  /* <div>
          <label>Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e.target.files[0])}
          />
          {preview || (
            <div
              id="upload-sign-box-text"
              className={noPicture ? "no-picture" : ""}
            >
              <i className="fa-solid fa-upload"></i>
              <div>
                {!noPicture
                  ? "Click to upload."
                  : "An Image is required to create a Pin."}
              </div>
            </div>
          )}
        </div> */
}
