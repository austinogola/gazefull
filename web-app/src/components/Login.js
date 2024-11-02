import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import "./styles/Login.css";
import background from "./images/background-cropped.png";
import logo from "./images/logo.png";
import google from "./images/search.png";
import mail from "./images/mail.png";
import lock from "./images/locked-computer.png";

// const SERVER_HOST = "http://localhost:5000";
const SERVER_HOST= process.env.REACT_APP_SERVER_HOST;
// const SERVER_HOST='http://213.148.17.135:8000'
// const SERVER_HOST='https://gazeguard-server-5be665b21a9f.herokuapp.com'
// const SERVER_HOST='http://127.0.0.1:8000'
// const SERVER_HOST='https://server.gazeguard.io'

export default function Login() {
  const [cookies, setCookie] = useCookies(["gg_token"]);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [keepMeSignedIn, setKeepMeSignedIn] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userParam = searchParams.get("bounce");

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setApiError("");
    if (validateForm()) {
      try {
        const response = await axios.post(
          `${SERVER_HOST}/auth/login/`,
          formData
        );
        if (response.data.status === "success") {
          const gg_token = response.data.gg_token;
          const date = new Date();
          date.setTime(
            date.getTime() + (keepMeSignedIn ? 21 : 1) * 24 * 60 * 60 * 1000
          );
          setCookie("gg_token", gg_token, { path: "/", expires: date });
          navigate(`/${userParam || ""}`);
        } else {
          setApiError(response.data.message);
        }
      } catch (error) {
        setApiError(error.response?.data.message || error.message);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="backgroundImage">
        <img src={background} alt="backgroung-img" />
      </div>
      <div className="login-card">
        <div className="logo-container">
          <div className="login-logo">
            <img src={logo} alt="logo-img" />
          </div>
          <h2>Sign in</h2>
          <p>Welcome to Gaze Guard sign-in page</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="floating-logo-div">
              <img src={mail} alt="email-logo" className="email-logo" />
              <input
                type="email"
                required
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>
          <div className="input-group">
            <div className="floating-logo-div">
              <img src={lock} alt="lock-logo" className="lock-logo" />

              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          <div className="form-options">
            <label className="keep-signed-in">
              <input
                type="checkbox"
                checked={keepMeSignedIn}
                onChange={(e) => setKeepMeSignedIn(e.target.checked)}
              />
              Keep me signed in
            </label>
            <a href="/forgotPassword" className="forgot-password">
              Forgot password?
            </a>
          </div>
          <button type="submit" className="sign-in-button" disabled={loading}>
            {loading ? "Signing in..." : "SIGN IN"}
          </button>
          {/* <div className="googleDiv">
            <button type="button" className="google-sign-in">
              <img className="google-icon" src={google} alt="google-logo" />
            </button>
          </div> */}
        </form>
        <p className="signup-link">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
        {apiError && <p className="error-message">{apiError}</p>}
      </div>
    </div>
  );
}
