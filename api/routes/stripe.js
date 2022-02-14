const router = require("express").Router();
// const stripe = require("stripe")(process.env.STRIPE_KEY);
//const KEY = process.env.STRIPE_KEY;
const KEY = 'sk_test_51KPCLNCd7keuu4XIh3ymRpTCVXEAVNevMLjBCnJWgNPwMNfwyhE2ILGfVpxiz9kyp63u9aahDuFdliQtjC9sL1Xp00ZVDFEa78';
const stripe = require("stripe")(KEY);
console.log(KEY);

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;