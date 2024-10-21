import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { loadStripe } from "@stripe/stripe-js";
import error from "./images/mark.png";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./styles/Checkout.css";
import "./styles/CardForm.css";

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_WEBHOOK_SECRET
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [planDetails, setPlanDetails] = useState({});
  const navigate = useNavigate();
  const [cookies] = useCookies(["gg_token"]);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const planType = searchParams.get("plan");

  useEffect(() => {
    if (!cookies.gg_token) {
      navigate(`/login?bounce=checkout`);
    }
  }, [cookies, navigate]);

  const getPlan = () => {
    fetch(`${serverUrl}/stripe/get-plan/${planType}`, {
      method: "GET",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.gg_token}`,
      },
    }).then(async (resp) => {
      const res = await resp.json();
      console.log(res);
      setPlanDetails(res.plan);
    });
  };

  useEffect(() => {
    getPlan();
  }, [planType]);

  const [formData, setFormData] = useState({
    name: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const serverUrl = "http://localhost:5000";
  const serverUrl= process.env.REACT_APP_SERVER_HOST;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setErrorMessage("");

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error("Error creating payment method:", error);
      setLoading(false);
      setErrorMessage(
        "Payment failed: Please check your card details and try again."
      );
      return;
    }

    try {
      const response = await fetch(`${serverUrl}/stripe/create-subscription`, {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.gg_token}`,
        },
        body: JSON.stringify({
          planType,
          formData: {
            name: formData.name,
            email: cookies.email,
            token: paymentMethod.id,
          },
        }),
      });

      const data = await response.json();
      console.log(data)
      setLoading(false);

      if (data.success  && data.success===true ) {
        console.log("Payment successful");
        alert("Subscription created successfully!");
        navigate("/");
      } else {
        console.error("Payment failed", data.message);
        setErrorMessage(`Payment failed: ${data.message}. Please try again.`);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error processing payment", error);
      setErrorMessage(
        `Error processing payment: ${error.message}. Please try again.`
      );
    }
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      {errorMessage && (
        <div className="error-banner">
          <div>
            <img src={error} alt="error-icom" />
          </div>
          {errorMessage}
        </div>
      )}

      <div className="checkout-content">
        <form className="payment-form" onSubmit={handleSubmit}>
          <h2>Credit/Debit Card</h2>
          <div className="form-group">
            <label htmlFor="name">Name On Card</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group card-details">
            <CardElement
              options={{
                style: { base: { fontSize: "16px" } },
                hidePostalCode: true,
              }}
            />
          </div>

          <button className="pay-button" type="submit" disabled={loading}>
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>

        <div className="plan-details">
          <h2>Plan Details</h2>
          <div className="plan-info">
            <img
              src="/path-to-plan-icon.png"
              alt="Plan Icon"
              className="plan-icon"
            />
            <div>
              <h3>{planDetails.name || "Selected Plan"}</h3>
              <p>${planDetails.price}/month</p>
            </div>
          </div>

          <div className="total">
            <p>Total</p>
            <p>${planDetails.price}</p>
          </div>

          <p className="terms">
            By checking out you agree with our Terms of Service and confirm that
            you have read our Privacy Policy. You can cancel recurring payments
            at any time.
          </p>
        </div>
      </div>
    </div>
  );
};

const Checkout = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Checkout;
