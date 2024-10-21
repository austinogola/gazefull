const Stripe = require("stripe");
const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const Member = require("../models/Member");
const Account = require("../models/Account");
const { authenticateJWT } = require("../middleware/token");
const router = express.Router();
require("dotenv").config();

const PLANS = {
  Free: {
    name: "Free",
    price: 0,
    images: "60 Minutes/Day",
    video: "5 Minutes/Day",
    id: "price_1QBKaTP0Bii0CHodzg28tB1H",
    link:'https://buy.stripe.com/test_fZebJz2A65fn0tG8wB'
  },
  Premium: {
    name: "Premium",
    price: 6.0,
    images: "Unlimited Minutes/Day",
    video: "45 Minutes/Day",
    id: "price_1Q7H9OP0Bii0CHodYPqqqEmd",
    link:"https://buy.stripe.com/test_8wM7tjcaGgY56S48wC"
  },
  Deluxe: {
    name: "Deluxe",
    price: 9.9,
    images: "Unlimited Minutes/Day",
    video: "Unlimited Minutes/Day",
    id: "price_1Q7HBFP0Bii0CHodsHrXHIEt",
    link:"https://buy.stripe.com/test_5kA9Bra2ydLT5O04gn"
  },
};

const STRIPE_WEBHOOK_SECRET = process.env.stripe_webhook_secret;
const STRIPE_SECRET_KEY = process.env.stripe_secret_key;
console.log(STRIPE_SECRET_KEY);
const STRIPE = new Stripe(STRIPE_SECRET_KEY);

const getSubsriptions = async () => {
  const subscriptions = await STRIPE.subscriptions.search({
    query: "status:'active'",
  });

  //   console.log(typeof subscriptions)
  //   const result = Object.values(subscriptions).map(ii => ({
  //     id: ii.id,
  //     items: ii.items,
  //     plan: ii.plan
  //   }));
  let tt = subscriptions.data.map((ii) => ({
    id: ii.id,
    items: ii.items,
    plan: ii.plan,
  }));
  console.log(tt);

  console.log(Object.keys(subscriptions));
  //   console.log(subscriptions.data)
  // console.log(subscriptions.search_result)
  // Object.values(subscriptions).forEach(tt=>{
  //
  // })
};

// getSubsriptions()

router.get("/get-plans", async (req, res, next) => {
  res.status(200).json({ plans: PLANS });
});
router.get("/get-plan/:id", authenticateJWT, async (req, res, next) => {
  const thePlan = Object.values(PLANS).find((obj) => obj.id === req.params.id);
  res.status(200).json({ plan: thePlan });
});

router.post("/create-subscription", authenticateJWT, async (req, res) => {
  console.log("Here is the user:", req.user);
  try {
    const { planType, formData } = req.body;

    console.log("Form data:", formData);
    console.log("plan type:", planType);

    const customer = await STRIPE.customers.create({
      name: formData.name,
      email: req.user.email, // Assuming email is part of formData
      payment_method: formData.token,
      invoice_settings: {
        default_payment_method: formData.token,
      },
    });

    // Attach the payment method to the customer
    await STRIPE.paymentMethods.attach(formData.token, {
      customer: customer.id,
    });

    // Set the payment method as the default payment method
    await STRIPE.customers.update(customer.id, {
      invoice_settings: {
        default_payment_method: formData.token,
      },
    });

    const subscription = await STRIPE.subscriptions.create({
      customer: customer.id,
      items: [{ price: planType }], // Make sure this price ID is dynamic based on planType
    });

    const theAccount = await Account.findOne({ memberId: req.user.id });

    const existingPayments = theAccount.payments.filter(
      (payment) => payment.subscriptionId === subscription.id
    );

    if (existingPayments.length === 0) {
      theAccount.payments.push({
        subscriptionId: subscription.id,
        customerId: subscription.customer,
        status: subscription.status,
        planId: subscription.plan.id,
        amount: subscription.plan.amount / 100,
        currency: subscription.currency,
        created: new Date(subscription.created * 1000),
        interval: subscription.plan.interval,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Subscription already exists." });
    }

    await theAccount.save();

    console.log("Account found:", theAccount);
    console.log("Subscription created:", subscription);

    res.json({ success: true, subscription });
  } catch (error) {
    console.error("Error creating subscription:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
