import React, { useEffect, useState } from 'react';
import "./styles/Success.css";
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';

export default function Success() {
  const [cookies, setCookie, removeCookie] = useCookies(['gg_token']);
  const navigate = useNavigate();

  useEffect(()=>{
    let gg_token=cookies.gg_token
      if(!gg_token){
        navigate('/login');
      }
  },[])
  return (
    <div className="success-container">
      <h1>Success!</h1>
      <p>You are successfully logged in.</p>
      <div className="success-message">
        <span role="img" aria-label="green tick" style={{ fontSize: '2rem' }}>✅</span>
        <p>Note: Please make sure to pin the extension.</p>
        <p>Join our community for FREE: <a href="https://discord.gg/gazeguard" target="_blank" rel="noopener noreferrer">discord.gg/gazeguard</a></p>
      </div>
    </div>
  );
}
