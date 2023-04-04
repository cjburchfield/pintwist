import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupForm({ onClose }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showModal, setShowModal] = useState(false);



  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if, e.g., server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <>
      <img src="../../../assets/Pinterest_icon.png" alt="Logo" className="logo"/>
      <img src="../../../assets/x-solid.svg" alt="Close-Button" className="close-button" onClick={onClose}/>
      <h1>Welcome to Pintwist</h1>
      <h2>Find new ideas to try</h2>
      <form onSubmit={handleSubmit}>
        <ul className="errors">
          {errors.map((error) => <li key={error}>{error}</li>)}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Username
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
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
      <p>Already a member? Log in</p>
    </>
  );
}

export default SignupForm;