import React, { useState } from "react";
import "./styles/forgotPassword.css";
import background from "./images/background-cropped.png";
import logo from "./images/logo.png";
import mail from "./images/mail.png";

const ForgotPassword = () => {
  const SERVER_HOST= process.env.REACT_APP_SERVER_HOST;
  const [email, setEmail] = useState("");
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    if (!/\S+@\S+\.\S+/.test(email)) {
      setApiError("Please enter a valid email address.");
      return;
    }
    try {
      return setApiError('Error here')
      setLoading(true)
      const response = await fetch(`${SERVER_HOST}/auth/request-password-reset`, {
        method:"POST",
        headers:{'Content-Type':"application/json"},
        body:JSON.stringify({email})
       });

       const res=await response.json()
       console.log(res)
      // if (response.data.status === "success") {
      //   alert(`If an account exists for ${email}, we will send password reset instructions.`);
      // } else {
      //   setApiError(response.data.message);
      // }
    } catch (error) {
      setApiError(error.response?.data.message || error.message);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="backgroundImage">
        <img src={background} alt="backgroung-img" />
      </div>
      <div className="forgot-password-card">
        <div className="icon-container">
          <div className="login-logo">
            <img src={logo} alt="logo-img" />
          </div>
        </div>
        <h2 className="forgot-password-title">Forgot Your Password?</h2>
        <p className="forgot-password-text">
          Don't worry. You can always reset it!
        </p>
        <form onSubmit={handleSubmit}>
          <div className="floating-logo-div">
            <img src={mail} alt="email-logo" className="email-logo" />
            <input
              type="email"
              className="forgot-password-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="forgot-password-button">
            Send Confirmation Email
          </button>

          <p style={{color:"white",textAlign:"center"}}>Sending...</p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
