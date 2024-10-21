import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import "./styles/plansPayments.css";

const PlansWithSideMenu = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cookies] = useCookies(["gg_token"]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get("/api/user/plans", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.gg_token}`,
          },
        });

        // Since Axios automatically parses the JSON, you can access data directly
        setPlans(response.data.payments);
      } catch (err) {
        // Handle error gracefully
        setError(
          err.response?.data?.message || err.message || "Failed to fetch plans"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [cookies.gg_token]);

  const filteredPlans = plans.filter((payment) => {
    if (filter === "succeeded") return payment.payment_confirmed === true;
    if (filter === "failed") return payment.payment_confirmed === false;
    return true; // Show all plans if filter is "all"
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="plans-page">
      <div className="side-menu">
        <ul>
          <li onClick={() => setFilter("all")}>All Plans</li>
          <li onClick={() => setFilter("succeeded")}>Succeeded Payments</li>
          <li onClick={() => setFilter("failed")}>Failed Payments</li>
        </ul>
      </div>
      <div className="plans-container">
        <h2>Your Plans</h2>
        <div className="plan-list">
          {filteredPlans.map((payment) => (
            <div className="plan-item" key={payment.subscriptionId}>
              <h3>{payment.planId}</h3>
              <p>Amount: {payment.amount}</p>
              <p>Currency: {payment.currency}</p>
              <p>Status: {payment.status}</p>
              <p>Date: {new Date(payment.created).toLocaleString()}</p>
              <p>
                Payment Confirmed: {payment.payment_confirmed ? "Yes" : "No"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlansWithSideMenu;
