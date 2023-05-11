import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import "./LoginForm.css";
import { Redirect, useHistory } from "react-router-dom";
import SignUpForm from "../SignupFormModal/SignupForm"

function LoginForm({ onClose }) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const session = useSelector(state => state.session)
  const [showLogin, setShowLogin] = useState(true);
  const [showSignup, setShowSignup] = useState(false);
  const history = useHistory();


  const handleSubmit = (e) => {
    if (e) e.preventDefault();
  
    setErrors([]);
    dispatch(sessionActions.login({ credential, password }))
      .then(() => {
        history.replace("/home");
      })
      .catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  };
  

  const handleDemoLogin = (e) => {
    e.preventDefault();
    dispatch(sessionActions.login({ credential: 'demo@pintwist.io', password: 'password' })).then(history.replace("/home"));
  }

  const formSwap = async (e) => {
    setShowLogin(false);
    setShowSignup(true);
  }

  return (
    <>
    { showLogin && (
      <>
      <img src="../../../assets/Pinterest_icon.png" alt="Logo" className="logo" />
      <img
        src="../../../assets/x-solid.svg"
        alt="Close-Button"
        className="close-button"
        onClick={ onClose }
      />
      <h1 className="modal-h1">Welcome to Pintwist</h1>
      <form onSubmit={handleSubmit}>
        <label className="modal-label">
          Email
          <div></div>
          <input
            className="modal-input"
            type="text"
            placeholder="Email"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <ul className="errors">
          {errors.map((error) => (
            <li className="errors" key={error}>{error}</li>
          ))}
        </ul>
        <div></div>
        <label className="modal-label">
          Password
          <div></div>
          <input
            className="modal-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="form-button">
          Log In
        </button>
        <div></div>
        <button type="button" className="demo-button" onClick={handleDemoLogin}>
          Demo Login
        </button>
      </form>
      <p className="terms">
        {" "}
        By continuing, you agree to Pintwist's non-existant{" "}
        <a href="https://policy.pinterest.com/en/terms-of-service">
          {" "}
          <span className="terms-link">Terms of Service</span>
        </a>{" "}
        &nbsp;and acknowledge you've read anyone else's&nbsp;
        <a href="https://policy.pinterest.com/en/privacy-policy">
          {" "}
          <span className="terms-link">Privacy Policy</span>
        </a>
        .
      </p>
      <hr className="solid" />
    <p> Not on Pintwist yet? <span onClick={formSwap} className="other-modal-link">Sign up</span> </p>
    </>
      )} {
        showSignup && (
          <SignUpForm />
        )
      }
    </>
  )
}

export default LoginForm;


