import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";

function LoginForm() {
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
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if, e.g., server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  };

  return (
    <>
      <img src="../../../assets/Pinterest_icon.png" alt="Logo" className="logo"/>
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
            Placeholder="Email"
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
            Placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="form-button">Log In</button>
      </form>
      <p className="terms"> By continuing, you agree to Pintwist's Terms of Service and acknowledge you've read 
        our Privacy Policy. Notice at collection.</p>
      <hr class="solid"/>
      <p>Not on Pintwist yet? Sign up</p>
    </>
  );
}

export default LoginForm;