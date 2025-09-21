import "./Header.scss";
import Button from "../Button/Button";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [isAccessTokenUser, setIsAccessTokenUser] = useState(
    localStorage.getItem("accessToken") ? true : false
  );
  const logout = useNavigate();

  function LogOut() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("uid");
    document.dispatchEvent(new CustomEvent("logOut", { bubbles: true }));
    logout("/signup", { replace: true });
  }
  function renderDataProfile() {
    if (isAccessTokenUser) {
      return (
        <>
          <Button
            styleClasses={"header__button button button_auth"}
            onClick={LogOut}
          >
            Log Out
          </Button>
        </>
      );
    } else {
      return (
        <>
          <NavLink to="/signin" className="header__link">
            Sign In
          </NavLink>
          <NavLink to="/signup" className="header__link">
            Sign Up
          </NavLink>
        </>
      );
    }
  }

  document.addEventListener("successSignIn", () => setIsAccessTokenUser(true));
  document.addEventListener("logOut", () => setIsAccessTokenUser(false));

  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__name">
          <Link to="/" className="header__name-a">
            <h1 className="header__name-text">TODO LIST</h1>
          </Link>
        </div>
        <div className="header__auth">{renderDataProfile()}</div>
      </div>
    </header>
  );
}
