const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },
  plan: { type: String, required: true },
  usage: [{ type: Object }],
  payments:[{ type: Object }],
  // payments: [
  //   {
  //     subscriptionId: { type: String, required: true },
  //     customerId: { type: String, required: true },
  //     status: { type: String, required: true },
  //     planId: { type: String, required: true },
  //     amount: { type: Number, required: true },
  //     currency: { type: String, required: true },
  //     created: { type: Date, required: true },
  //     interval: { type: String, required: true },
  //     invoice_id: { type: String },
  //     payment_confirmed: { type: Boolean, default: false },
  //   },
  // ],
});

const Account = mongoose.model("Account", accountSchema);
module.exports = Account;
