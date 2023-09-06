import React, {useEffect, useState} from "react";
import {login} from "../../store/session";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {useModal} from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [formErr, setFormErr] = useState({});
  const [didSubmit, setDidSubmit] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const {closeModal} = useModal();

  useEffect(() => {
    const errorsObj = {};

    if (!email) {
      errorsObj.email = "Email is required";
    } else {
      const emailLength = email.length;
      if (emailLength < 4 || emailLength > 40) {
        errorsObj.email = "Email must be between 4 and 40 characters";
      }
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      errorsObj.email = "Please enter a valid email address";
    }

    if (!password) errorsObj.password = "Password is required";

    setFormErr(errorsObj);
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDidSubmit(true);
    if (Object.keys(formErr).length === 0) {
      const data = await dispatch(login({email, password}));
      if (data) {
        console.log("🐤 DATA", data);
        const errorsObj = {invalid: "Invalidal credentials"};

        // const flattenedData = {};
        // data.forEach((item) => {
        //   const [key, value] = item.split(" : ");
        //   flattenedData[key.trim()] = value.trim();
        // });
        setFormErr(errorsObj);
      } else {
        closeModal();
        history.push("/");
        return null;
      }
    }
  };

  const demoUser = async (e) => {
    e.preventDefault();

    const email = "demo@aa.io";
    const password = "password";

    setFormErr({});
    setDidSubmit(true);

    await dispatch(login({email, password}));

    setErrors([]);
    closeModal();
    history.push("/");
  };

  return (
    <div className="log-wrap">
      <div className="welcome-sign">Sign In</div>
      <form onSubmit={handleSubmit} className="log-form">
        {/* <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul> */}
        {didSubmit && formErr.invalid && (
          <p className="sign-err">{formErr.invalid}</p>
        )}
        <label className="sign-label">
          Email
          <input
            className="sign-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        {/* {email.length < 4 && email.length > 0 && (
          <p className="sign-err">Please input a valid email</p>
        )} */}
        {didSubmit && formErr.email && (
          <p className="sign-err">{formErr.email}</p>
        )}
        {!didSubmit && email.length < 4 && email.length > 0 && (
          <p className="sign-err">Email is required</p>
        )}
        <label className="sign-label">
          Password
          <input
            className="sign-input"
            type={visible1 ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div onClick={() => setVisible1(!visible1)} className="pwicon">
            {visible1 ? (
              <i className="fa-regular fa-eye"></i>
            ) : (
              <i className="fa-regular fa-eye-slash"></i>
            )}
          </div>
        </label>
        {password.length < 6 && password.length > 0 && (
          <p className="sign-err">Password is required</p>
        )}
        {didSubmit && formErr.password && (
          <p className="sign-err">{formErr.password}</p>
        )}
        <button type="submit" className="continue-btn">
          Log In
        </button>
        <button className="demo-btn" onClick={demoUser}>
          Demo User
        </button>
      </form>
      <div className="on-pinthis">
        <div className="not-on">Not a member yet? </div>
        <div className="reg-btn">
          <OpenModalButton
            buttonText="Register"
            modalComponent={<SignupFormModal />}
          />
        </div>
      </div>
    </div>
  );
}

export default LoginFormModal;
