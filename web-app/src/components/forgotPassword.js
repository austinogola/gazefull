import React, { useState } from "react";
import "./styles/forgotPassword.css";
import background from "./images/background-cropped.png";
import logo from "./images/logo.png";
import mail from "./images/mail.png";
import Spinner from "./Spinner";


const ForgotPassword = () => {
  const SERVER_HOST= process.env.REACT_APP_SERVER_HOST;
  const [email, setEmail] = useState("");
  const [apiError, setApiError] = useState("");
  const [successMsg, setsuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setsuccessMsg("")
    if (!/\S+@\S+\.\S+/.test(email)) {
      setApiError("Please enter a valid email address.");
      return;
    }
    try {
      setLoading(true)
      const response = await fetch(`${SERVER_HOST}/auth/request-password-reset`, {
        method:"POST",
        headers:{'Content-Type':"application/json"},
        body:JSON.stringify({email})
       });

       const res=await response.json()
       console.log(res)
      if (res.status === "success") {
        setsuccessMsg(`If an account exists for ${email}, we have sent reset instructions to the email.`)

      } else {
        setApiError(res.message);
      }
      setLoading(false)
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
              type="text"
              className="forgot-password-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="forgot-password-button" disabled={loading}>
            {loading ? "Sending..." : "Send Confirmation Email"}
          </button>

          {/* <p style={{color:"white",textAlign:"center"}}>Sending...</p> */}
          {apiError && <p className="error-message">{apiError}</p>}
          {successMsg && <p className="success-message">{successMsg}</p>}
        </form>
      </div>
      {loading && <Spinner />}
    </div>
  );
};

export default ForgotPassword;
