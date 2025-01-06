import React, { useState } from 'react';
import {useNavigate, useSearchParams } from 'react-router-dom';
// import './styles/PasswordResetForm.css';
import "./styles/Login.css";
import background from "./images/background-cropped.webp";

function PasswordResetForm() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [loading, setLoading] = useState(false);

   const [apiError, setApiError] = useState("");
  const [successMsg, setsuccessMsg] = useState("");
  const [countDown,setCountDown]=useState(3);
   const navigate = useNavigate();

  const serverUrl=process.env.REACT_APP_SERVER_HOST

  const handleSubmit = (e) => {
    e.preventDefault();
   
    if (password !== confirmPassword) {
      setApiError('Passwords do not match');
      return;
    }

    setApiError('')
    setsuccessMsg('')
    // Logic to handle password reset using the token
    fetch(`${serverUrl}/auth/reset-password/${token}`,{
      method:'POST',
      credentials: "same-origin",
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${cookies.gg_token}`,
        },
        body:JSON.stringify({newPassword:password})
    })
    .then(async resp => {
      let res = await resp.json();
      if (res.status==='success') {
        setsuccessMsg('Password reset successful!');
        
        // setsuccessMsg(res.message)
        // Optionally redirect the user or clear the form
      } else {
        setApiError(`Error: ${res.message || 'Password reset failed'}`);
      }
    })
    .catch(error => {
      console.error('Error during password reset:', error);
      setApiError('An unexpected error occurred. Please try again later.');
    });
  };

  return (
    <div className="login-container">
      <div className="backgroundImage">
        <img src={background} alt="backgroung-img" />
      </div>

      <div className="login-card">
        <div className="logo-container">
                  <div className="login-logo">
                    {/* <img src={logo} alt="logo-img" /> */}
                  </div>
                  <h2>Password reset</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="floating-logo-div">
              <input
                type="text"
                required
                placeholder="New password"
                value={password}
                onChange={(e) =>
                  setPassword( e.target.value)
                }
              />
            </div>
          </div>
          <div className="input-group">
            <div className="floating-logo-div">
              <input
                type="text"
                required
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword( e.target.value)
                }
              />
            </div>
          </div>

          <button type="submit" className="sign-up-button" disabled={loading}>
            {loading ? "Resetting password..." : "Reset"}
          </button>

          {apiError && <p className="error-message">{apiError}</p>}
          {successMsg && <p className="success-message">{successMsg} <a href='/login'
          style={{color:'#27FF82'}}>Login to your account </a></p>}
          
         
          {/* <button type="submit" className="sign-in-button" disabled={loading}>
            {loading ? "Signing in..." : "SIGN IN"}
          </button> */}
          {/* <div className="googleDiv">
            <button type="button" className="google-sign-in">
              <img className="google-icon" src={google} alt="google-logo" />
            </button>
          </div> */}
        </form>
      </div>
    </div>
    // <div className="password-reset-form-container">
      
    //   <h1>Set New Password</h1>
    //   <form onSubmit={handleSubmit} className="password-reset-form">
    //     <label className="password-reset-label">
    //       New Password:
    //       <input
    //         type="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         required
    //         className="password-reset-input"
    //       />
    //     </label>
    //     <label className="password-reset-label">
    //       Confirm Password:
    //       <input
    //         type="password"
    //         value={confirmPassword}
    //         onChange={(e) => setConfirmPassword(e.target.value)}
    //         required
    //         className="password-reset-input"
    //       />
    //     </label>
    //     <button type="submit" className="password-reset-button">Reset Password</button>
    //   </form>
    // </div>
  );
}

export default PasswordResetForm;
