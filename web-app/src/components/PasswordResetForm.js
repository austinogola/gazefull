import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './styles/PasswordResetForm.css';

function PasswordResetForm() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const serverUrl=process.env.REACT_APP_SERVER_HOST

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Logic to handle password reset using the token
    fetch(`${serverUrl}/auth/reset-password/${token}`,{
      method:'POST',
      credentials: "same-origin",
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${cookies.gg_token}`,
        },
        body:JSON.stringify({newPassword:password})
    }).then(async resp=>{
      const res=await resp.json()
      console.log(res)
    //   setPlanDetails(res.plan)
      // setPLANS(res.plans)
      // window.location.href = res.plan.link;
    })
    console.log('Password reset with token:', token);
  };

  return (
    <div className="password-reset-form-container">
      <h1>Set New Password</h1>
      <form onSubmit={handleSubmit} className="password-reset-form">
        <label className="password-reset-label">
          New Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="password-reset-input"
          />
        </label>
        <label className="password-reset-label">
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="password-reset-input"
          />
        </label>
        <button type="submit" className="password-reset-button">Reset Password</button>
      </form>
    </div>
  );
}

export default PasswordResetForm;
