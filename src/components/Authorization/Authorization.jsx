import "./Authorization.scss";
import Loader from "../Loader/Loader";
import Button from "../Button/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../myFirebase";

export default function Authorization({ action = "Sign In" }) {
  const [loading, setLoading] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const showContent = useNavigate();

  async function SignUp(event) {
    event.preventDefault();

    const formElement = document.querySelector(".form__inner");
    const validEmail = validateEmail(formElement.email.value);
    const validPassword = validatePassword(formElement.password.value);
    const validParams = validEmail && validPassword;

    if (validEmail) {
      setErrorEmail(false);
    } else {
      setErrorEmail(true);
    }

    if (validPassword) {
      setErrorPassword(false);
    } else {
      setErrorPassword(true);
    }

    if (validParams) {
      try {
        setLoading(true);
        const response = await createUserWithEmailAndPassword(
          auth,
          formElement.email.value,
          formElement.password.value
        );
        localStorage.setItem("accessToken", response.user.accessToken);
        createEventSuccessSignIn(response.user.uid);
      } catch (error) {
        alert(
          `Account creation error. A user with the same email address already exists. More info: ${error}`
        );
      } finally {
        setLoading(false);
      }
    }
  }
  async function SignIn(event) {
    event.preventDefault();

    const formElement = document.querySelector(".form__inner");
    const email = formElement.email.value;
    const password = formElement.password.value;

    try {
      setLoading(true);
      const response = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("accessToken", response.user.accessToken);
      createEventSuccessSignIn(response.user.uid);
    } catch (error) {
      alert(`Error sign in. ${error}`);
    } finally {
      setLoading(false);
    }
  }

  function onClickInputAndButton(event) {
    if (action === "Sign Up") {
      SignUp(event);
    } else {
      SignIn(event);
    }
  }
  function validateEmail(email) {
    const rule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return rule.test(email);
  }
  function validatePassword(password) {
    const rule = /^.{6,}$/;
    return rule.test(password);
  }
  function createEventSuccessSignIn(uid) {
    localStorage.setItem("uid", uid);
    document.dispatchEvent(
      new CustomEvent("successSignIn", {
        bubbles: true,
      })
    );
    showContent("/", { replace: true });
  }

  return (
    <>
      {loading && <Loader />}
      <div className="form">
        <form className="form__inner">
          <h1 className="form__title">{action + " for the TODO app"}</h1>
          <input
            type="email"
            name="email"
            className="form__email"
            placeholder="Email"
            onSubmit={(event) => {
              onClickInputAndButton(event);
            }}
          />
          {errorEmail && action !== "Sign In" && (
            <div className="form__error">
              Please enter a valid email address
            </div>
          )}

          <input
            type="password"
            name="password"
            className="form__password"
            placeholder="Password"
            onSubmit={(event) => {
              onClickInputAndButton(event);
            }}
          />
          {errorPassword && action !== "Sign In" && (
            <div className="form__error">
              The password must contain at least 6 characters
            </div>
          )}

          <Button
            styleClasses={"form__button button"}
            onClick={(event) => {
              onClickInputAndButton(event);
            }}
          >
            {action}
          </Button>
        </form>
      </div>
    </>
  );
}
