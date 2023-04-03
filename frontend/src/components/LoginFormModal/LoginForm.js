import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";


function LoginForm( ) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
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


  return (
    <>
      <img src="../../../assets/Pinterest_icon.png" alt="Logo" className="logo"/>
      <img src="../../../assets/x-solid.svg" alt="Close-Button" className="close-button" />
      <h1>Welcome to Pintwist</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
        <label>
          Email
          <div></div>
          <input
            type="text"
            placeholder="Email"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <div></div>
        <label>
          Password
          <div></div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="form-button">Log In</button>
      </form>
      <p className="terms"> By continuing, you agree to Pintwist's non-existant 
        <a href="https://policy.pinterest.com/en/terms-of-service"> <span className="terms-link">Terms of Service</span></a> 
        &nbsp;and acknowledge you've read 
        anyone else's&nbsp;
        <a href="https://policy.pinterest.com/en/privacy-policy"> <span className="terms-link">Privacy Policy</span></a>
        .</p>
      <hr className="solid"/>
      <p>Not on Pintwist yet?
      <span className="other-modal-link">Sign up</span>
      </p>
    </>
  );
}

export default LoginForm;





