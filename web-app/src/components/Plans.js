import React, { useEffect,useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import './styles/Plans.css'

const Plans = () => {
  const [cookies] = useCookies(['gg_token']);
  const navigate = useNavigate();

  const [PLANS,setPLANS]=useState({
    Free:{price:0,images:'',video:'',id:'free'},
    Premium:{price:0,images:'',video:'',id:'free'},
    Deluxe:{price:0,images:'',video:'',id:'free'}
  })

  // const serverUrl='http://localhost:5000'
   const serverUrl= process.env.REACT_APP_SERVER_HOST;

  const getPlans=()=>{
    fetch(`${serverUrl}/stripe/get-plans`,{
      method:'GET',
      credentials: "same-origin",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.gg_token}`,
        },
    }).then(async resp=>{
      const res=await resp.json()
      setPLANS(res.plans)
    })
  }

  useEffect(() => {
    if (!cookies.gg_token) {
      navigate(`/login?bounce=plans`);
    }else{
      getPlans()
    }
  }, [cookies, navigate]);

  const handleChoosePlan = (plan) => {
    // Navigate to payment page with the selected plan
    navigate(`/checkout?plan=${plan}`);
  };

  return (
    <div className="pricing-container">
      <h1>Pricing</h1>
      <div className="pricing-plans">
        <div className="plan free-plan">
          <h2>Free Plan</h2>
          <p className="price">${PLANS.Free.price}/month</p>
          <ul>
          <li>Images : {PLANS.Free.images}</li>
          <li>Videos:  {PLANS.Free.video}</li>
          </ul>
          <button onClick={() => handleChoosePlan(PLANS.Free.id)}>Choose Plan</button>
        </div>
        <div className="plan premium-plan">
          <div className="most-popular">Most Popular</div>
          <h2>Premium Plan</h2>
          <p className="price">${PLANS.Premium.price}/month</p>
          <ul>
            <li>Images : {PLANS.Premium.images}</li>
            <li>Videos:  {PLANS.Premium.video}</li>
          </ul>
          <button onClick={() => handleChoosePlan(PLANS.Premium.id)}>Choose Plan</button>
        </div>
        <div className="plan deluxe-plan">
          <h2>Deluxe Plan</h2>
          <p className="price">${PLANS.Deluxe.price}/month</p>
          <ul>
          <li>Images : {PLANS.Deluxe.images}</li>
          <li>Videos:  {PLANS.Deluxe.video}</li>
          </ul>
          <button onClick={() => handleChoosePlan(PLANS.Deluxe.id)}>Choose Plan</button>
        </div>
      </div>
    </div>
  );
};

export default Plans;
