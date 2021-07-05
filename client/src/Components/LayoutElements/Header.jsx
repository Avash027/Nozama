import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [search, setSearch] = useState("");

  const logoutUser = () => {
    dispatch(logout());
  };

  return (
    <nav className="header">
      <div className="header-left">
        <div className="header-logo">
          <a href="/" className="a-white">
            Nozama
          </a>
        </div>

        <input
          type="text"
          placeholder="Phones,Laptops"
          className="header-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>

        <a href={`/search/${encodeURI(search)}`} className="header-search">
          <i className="fas fa-search"></i>
        </a>
      </div>

      <div className="header-right">
        {userInfo && userInfo.isAdmin && (
          <a href="/add" className="a-white header-right-add">
            <i className="fas fa-plus "></i>Add/Delete Products
          </a>
        )}

        <a href="/cart" className="a-white">
          <i className="fas fa-shopping-cart"></i>Cart
        </a>

        <a href={userInfo ? "/user/profile" : "/login"} className="a-white">
          <i className="fas fa-user header-right-signin"></i>
          {userInfo ? " " + userInfo.name : "Sign Up / Log In"}
        </a>

        {userInfo && (
          <a href="/" className="a-white" onClick={logoutUser}>
            <i className="fas fa-sign-out-alt header-logout"></i> Logout
          </a>
        )}
      </div>
    </nav>
  );
};

export default Header;
