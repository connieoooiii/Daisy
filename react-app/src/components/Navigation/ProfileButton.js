import React, {useState, useEffect, useRef} from "react";
import {useDispatch} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {logout} from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import CreateProduct from "../CreateProduct";

function ProfileButton({user}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current?.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <div className="profile-wrap">
      {user ? (
        <div className="after-log">
          <div className="create-pro-b">
            <OpenModalButton
              modalComponent={<CreateProduct />}
              buttonText="Create A Product"
            />
          </div>
          <div>
            <button onClick={openMenu} className="person-btn">
              <i class="fa-solid fa-user" id="user-icon"></i>
            </button>
            <ul className={ulClassName} ref={ulRef}>
              <div className="ul-div">
                <li className="hello">Hello, {user?.first_name}!</li>
                <li className="hello">
                  <Link to="/products/manage">Manage Products</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="peace-out">
                    Log Out
                  </button>
                </li>
              </div>
            </ul>
            <Link to="/shopping-cart">
              <i className="fas fa-shopping-cart" id="cart-icon"></i>
            </Link>
          </div>
        </div>
      ) : (
        <div className="sign-nav">
          <OpenModalButton
            buttonText="Sign In"
            onItemClick={closeMenu}
            modalComponent={<LoginFormModal />}
          />
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
