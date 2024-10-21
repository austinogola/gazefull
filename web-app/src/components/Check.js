import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Check=()=>{
    
    const [cookies] = useCookies(['gg_token']);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const planType = searchParams.get('plan');

     // const serverUrl='http://localhost:5000'
  const serverUrl=process.env.REACT_APP_SERVER_HOST

     const getPlan=()=>{
    fetch(`${serverUrl}/stripe/get-plan/${planType}`,{
      method:'GET',
      credentials: "same-origin",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.gg_token}`,
        },
    }).then(async resp=>{
      const res=await resp.json()
      console.log(res)
    //   setPlanDetails(res.plan)
      // setPLANS(res.plans)
      window.location.href = res.plan.link;
    })
  }

    useEffect(() => {
        if (cookies.gg_token) {
          getPlan()
          // Redirect to the Stripe payment link if logged in
        //   window.location.href = 'https://your-stripe-payment-link.com';
        } else {
          // Redirect to the signup page if not logged in
          navigate(`/login?bounce=checkout?plan=${planType}`);
        }
      }, [cookies, navigate]);
    
    return(null)
}

export default Check