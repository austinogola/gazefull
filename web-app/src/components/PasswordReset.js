import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './styles/PasswordReset.css';

function PasswordReset() {
  const [email, setEmail] = useState('');
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle password reset request using the token
    console.log('Password reset link sent to:', email, 'with token:', token);
  };

  return (
    <div className="password-reset-container">
      <h1>Reset Your Password</h1>
      <form onSubmit={handleSubmit} className="password-reset-form">
        <label className="password-reset-label">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="password-reset-input"
          />
        </label>
        <button type="submit" className="password-reset-button">Send Reset Link</button>
      </form>
    </div>
  );
}

export default PasswordReset;
