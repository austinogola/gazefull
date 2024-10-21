import React, { useState } from "react";
import "./styles/forgotPassword.css";
import background from "./images/background.png";
import logo from "./images/logo.png";
import mail from "./images/mail.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password reset requested for:", email);
    alert(
      `If an account exists for ${email}, we will send password reset instructions.`
    );
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
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
