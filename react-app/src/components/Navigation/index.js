import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import ProfileButton from "./ProfileButton";

import "./Navigation.css";
import {getSearchedProductsThunk} from "../../store/products";
import {useHistory} from "react-router-dom";

function Navigation({isLoaded}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const [searchText, setSearchText] = useState("");

  const handleSearch = async (e) => {
    if (e) {
      e.preventDefault();
    }
    await dispatch(getSearchedProductsThunk(searchText));
    history.push("/products/search");
    setSearchText("");
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <ul className="nav-bar">
      <li className="list">
        <div className="cloud-nav">
          <NavLink exact to="/">
            <img
              className="daisy-logo"
              src="https://cdn.discordapp.com/attachments/1138505164358164483/1138930197878550679/daisy.png?ex=660dba67&is=65fb4567&hm=933cae9d9d3d6b3e62cff1b3a810ceb027c5c0933ed571dc4ca3353cc21fe356&"
            />
          </NavLink>
          <NavLink exact to="/" className="logo">
            Daisy
          </NavLink>
        </div>
      </li>
      <div className="nav-search">
        <i className="fas fa-search" onClick={handleSearch}></i>
        <input
          className="search-input"
          placeholder="Search our amazing products. Example 'sun'"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
