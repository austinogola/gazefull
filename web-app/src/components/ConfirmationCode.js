import React, { useState } from "react";
import { useNavigate,useSearchParams,useLocation } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import "./styles/ConfirmationCode.css";
import background from "./images/background-cropped.webp";
import logo from "./images/logo.png";
import "./styles/Signup.css";
import Spinner from "./Spinner";



const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;

function ConfirmationCode() {
 
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();

  console.log(location)

   const [cookies, setCookie] = useCookies(["gg_token"]);
    const [confirmationCode, setconfirmationCode] = useState('');
    const [email, setEmail] = useState((location && location.state)?location.state.email:null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setLoading(true);
    try {
      const response = await axios.post(`${SERVER_HOST}/auth/confirm-code`, { code:confirmationCode,email });
      console.log(response.data)
      if (response.data.status === "success") {
        const gg_token = response.data.gg_token;
        const date = new Date();
        date.setTime(date.getTime() + 21 * 24 * 60 * 60 * 1000);
        setCookie("gg_token", gg_token, { path: "/", expires: date });
        navigate(`/success`);
      } else {
        setApiError(response.data.message);
      }
    } catch (error) {
      const errMessage = error.response?.data.message || error.message;
      setApiError(errMessage);
    } finally {
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
                  <h2>Confirm sign up</h2>
                  <p style={{fontSize:'1rem'}}>Enter the code sent to your email, {email}</p>
          </div>

          <form onSubmit={handleSubmit} style={{position:"relative",bottom:'15px'}}>
          <div className="signup-input-group">
                <div className="floating-logo-div">
                  <input
                    type="text"
                    placeholder="Code"
                    value={confirmationCode}
                    onChange={(e) =>
                      setconfirmationCode(e.target.value)
                    }
                    required
                  />
                </div>
            </div>
            <button type="submit" className="confirm-btn" disabled={loading}>
            {loading ? "Confirming..." : "CONFIRM"}
          </button>

          <p style={{textAlign:'center',color:'white'}}>Wrong email or facing issues? <a style={{color:'white'}}href="/signup">Back to Signup</a></p>

          {apiError && <p className="error-message">{apiError}</p>}
        </form>
        
      </div>

      {loading && <Spinner />}
     
      {/* <h2>Enter Confirmation Code</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Confirmation Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>
       */}
    </div>
  );
}

export default ConfirmationCode;
