import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/ConfirmationCode.css";

const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;

function ConfirmationCode() {
  const [code, setCode] = useState("");
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setLoading(true);
    try {
      const response = await axios.post(`${SERVER_HOST}/auth/confirm`, { code });
      if (response.data.status === "success") {
        navigate(`/welcome`);
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
    <div className="confirmation-code-container">
      <h2>Enter Confirmation Code</h2>
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
      {apiError && <p className="error-message">{apiError}</p>}
    </div>
  );
}

export default ConfirmationCode;
