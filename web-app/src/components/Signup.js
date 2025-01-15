import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./styles/Signup.css";
import Spinner from "./Spinner";
import background from "./images/background-cropped.webp";
import logo from "./images/logo.png";
import google from "./images/search.png";
import mail from "./images/mail.png";
import lock from "./images/locked-computer.png";
import {GoogleButton} from 'react-oauth-ninja';

// const SERVER_HOST = "http://localhost:5000";
 const SERVER_HOST= process.env.REACT_APP_SERVER_HOST;
function Signup() {
  const [cookies, setCookie] = useCookies(["gg_token"]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone:""
  });
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userParam = searchParams.get("bounce");

  const validateForm = () => {
    return formData.email && formData.password;
  };
 
  console.log(process.env.REACT_APP_G00GLE_ID)

  let redirect_uri=`${process.env.REACT_APP_WEB_HOST}/oauth-google`

  console.log(redirect_uri)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setLoading(true);
    if (validateForm()) {
      try {
        const response = await axios.post(
          `${SERVER_HOST}/auth/signup/`,
          formData
        );
        if (response.data.status === "success") {
          console.log(response.data)
          const gg_token = response.data.gg_token;
          const date = new Date();
          date.setTime(date.getTime() + 21 * 24 * 60 * 60 * 1000); // 21 days from now

          // setCookie("gg_token", gg_token, { path: "/", expires: date });
          navigate(`/confirm-signup`,{ state: { email: formData.email }});
        } else {
          setApiError(response.data.message);
        }
      } catch (error) {
        const errMessage = error.response?.data.message || error.message;
        setApiError(errMessage);
      } finally {
        setLoading(false);
      }
    } else {
      setApiError("Please fill in all fields");
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-backgroundImage">
        <img src={background} alt="backgroung-img" />
      </div>
      <div className="signup-card-div">
        <div className="signup-logo-container">
          <div className="signup-logo">
            <img src={logo} alt="logo-img" />
          </div>
          <h2>Sign up</h2>
          <p>Create your Gaze Guard account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="signup-input-group">
            <div className="floating-logo-div">
              <img src={mail} alt="email-logo" className="email-logo" />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="signup-input-group">
            <div className="floating-logo-div">
              <PhoneInput
                id='PhoneInput'
                country={'us'}
                value={formData.phone}
                onChange={phone => setFormData({ ...formData, phone })}
                inputProps={{
                  name: 'phone',
                  id:'PhoneInput',
                  required: true,
                  autoFocus: true
                }}
              />
            </div>
          </div>

          <div className="signup-input-group">
            <div className="floating-logo-div">
              <img src={lock} alt="lock-logo" className="lock-logo" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
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
          <button type="submit" className="sign-up-button" disabled={loading}>
            {loading ? "Signing up..." : "SIGN UP"}
          </button>
          {/* <div className="googleDiv">
            <button type="button" className="google-sign-in">
              <img className="google-icon" src={google} alt="google-logo" />
            </button>
          </div> */}
          {apiError && <p className="error-message">{apiError}</p>}
        </form>
        <div class="or-divider">
          <span>OR</span>
        </div>
        <div className="floating-logo-div">
          <GoogleButton 
                client_id={process.env.REACT_APP_G00GLE_ID}

                redirect_uri={redirect_uri}

                styles={{width:"100%"}}
            />
        </div>
        
        <p className="login-link">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
      {loading && <Spinner />}
    </div>
  );
}

export default Signup;
