import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {useModal} from "../../context/Modal";
import {signUp} from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";

import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [formErr, setFormErr] = useState({});
  const [didSubmit, setDidSubmit] = useState(false);
  const {closeModal} = useModal();

  useEffect(() => {
    const errorsObj = {};

    if (!password) errorsObj.password = "Password is required";

    if (!email) {
      errorsObj.email = "Email is required";
    } else {
      const emailLength = email.length;
      if (emailLength < 4 || emailLength > 40) {
        errorsObj.email = "Email must be between 4 and 40 characters";
      }
    }

    if (!username) {
      errorsObj.username = "Username is required";
    } else {
      const userLength = username.length;
      if (userLength < 4 || userLength > 40) {
        errorsObj.username = "Username must be between 4 and 40 characters";
      }
    }

    if (!first_name) {
      errorsObj.firstName = "First name is required";
    } else {
      const userLength = first_name.length;
      if (userLength < 4 || userLength > 40) {
        errorsObj.firstName = "First name must be between 4 and 40 characters";
      }
    }

    if (last_name.length > 40)
      errorsObj.lastName = "Last name must be no more than 40 characters";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      errorsObj.email = "Please enter a valid email address";
    }

    if (password.length < 6)
      errorsObj.passLength = "Password must be at least 6 characters";

    setFormErr(errorsObj);
  }, [email, username, password, first_name, last_name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDidSubmit(true);

    if (Object.keys(formErr).length === 0) {
      if (password === confirmPassword) {
        setFormErr({});
        const data = await dispatch(
          signUp(email.toLowerCase(), username, first_name, last_name, password)
        );
        if (data) {
          console.log("🍀 data", data);
          const flattenedData = {};
          data.forEach((item) => {
            const [key, value] = item.split(" : ");
            flattenedData[key.trim()] = value.trim();
          });
          setFormErr(flattenedData);
        } else {
          closeModal();
          history.push("/products");
        }
      } else {
        setErrors([
          "Confirm Password field must be the same as the Password field",
        ]);
      }
    }
  };

  //   const disabled = password.length < 6 || username.length < 4 ? true : null;

  return (
    <div className="sign-wrap">
      <div className="welcome-sign">Create your account</div>
      <div className="new-ideas">Registration is easy.</div>
      <form onSubmit={handleSubmit} className="sign-form">
        {/* <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul> */}
        <label className="sign-label">
          Email
          <input
            className="sign-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {email.length < 4 && email.length > 0 && (
          <p className="sign-err">Please input a valid email</p>
        )}
        {didSubmit && formErr.email && (
          <p className="sign-err">{formErr.email}</p>
        )}

        <label className="sign-label">
          Username
          <input
            className="sign-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {didSubmit && formErr.username && (
          <p className="sign-err">{formErr.username}</p>
        )}
        {/* {username.length < 4 && username.length > 0 && (
          <p className="sign-err">Username must be at least 4 characters</p>
        )} */}
        <label className="sign-label">
          First Name
          <input
            className="sign-input"
            type="text"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {didSubmit && formErr.firstName && (
          <p className="sign-err">{formErr.firstName}</p>
        )}
        {/* {first_name.length < 2 && first_name.length > 0 && (
          <p className="sign-err">First name is required</p>
        )} */}
        <label className="sign-label">
          Last Name
          <input
            className="sign-input"
            type="text"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        {didSubmit && formErr.lastName && (
          <p className="sign-err">{formErr.lastName}</p>
        )}
        <label className="sign-label">
          Password
          <input
            className="sign-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label className="sign-label">
          Confirm Password
          <input
            className="sign-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button
          //   className={`continue-btn ${disabled ? "inactive" : ""}`}
          className="continue-btn"
          type="submit"
          //   disabled={disabled}
        >
          Sign Up
        </button>
        <div className="on-pinthis">
          <div className="not-on">Already a member? </div>
          <OpenModalButton
            buttonText="Log in"
            modalComponent={<LoginFormModal />}
          />
        </div>
      </form>
    </div>
  );
}

export default SignupFormModal;
