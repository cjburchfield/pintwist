import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';
import { NavLink } from "react-router-dom";
import LoginForm from "../LoginFormModal/LoginForm";

function SignupForm({ onClose }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(true);
  


  if (sessionUser) return <Redirect to="/home" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
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
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  const formSwap = async (e) => {
    setShowLogin(true);
    setShowSignup(false);
  }

  return (
    <>
    { showSignup && (
      <>
      <img src="../../../assets/Pinterest_icon.png" alt="Logo" className="logo"/>
      <img src="../../../assets/x-solid.svg" alt="Close-Button" className="close-button" onClick={onClose}/>
      <h1 className="modal-h1">Welcome to Pintwist</h1>
      <h2 className="modal-h2">Find new ideas to try</h2>
      <form onSubmit={handleSubmit}>
        <ul className="errors">
          {errors.map((error) => <li key={error}>{error}</li>)}
        </ul>
        <label className="modal-label">
          Email
          <input
            className="modal-input"
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="modal-label">
          Username
          <input
            className="modal-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label className="modal-label">
          Password
          <input
            className="modal-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label className="modal-label">
          Confirm Password
          <input
            className="modal-input"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="form-button">Continue</button>
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
      <hr className="solid"/>
      <p> Already a member? <span onClick={formSwap} className="other-modal-link">Log in</span> </p>
    </>
)} {
  showLogin && (
    <LoginForm />
  )
}
</>
)
}

export default SignupForm;