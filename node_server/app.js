const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const authRoutes = require("./routes/auth");
const stripeRoutes = require("./routes/stripe");
const webhookRoutes = require("./routes/webhook");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// Raw body parsing for webhook route
app.use("/webhook", express.raw({ type: "application/json" }), webhookRoutes);

// Middleware
const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://app.gazeguard.io",
  "https://www.app.gazeguard.io",
  "https://www.gazeguard.io",
  "https://server.gazeguard.io",
  "https://gazeguard.io",
  "chrome-extension://ogbgjcgkbdmbfgbeiapcincmjgibmijc"
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
// app.use(cors())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport");

// Other routes
app.use("/auth", authRoutes);
app.use("/stripe", stripeRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = app;
