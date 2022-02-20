const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const cors = require('cors');
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const cartRoute = require("./routes/cart");
const stripeRoute = require("./routes/stripe");
const path = require('path');


dotenv.config();

mongoose
  .connect(
    process.env.MONGO_URL
  )
  .then(()  => console.log("db succes"))
  .catch((err) => { 
    console.log(err); 
  });

  app.use(express.json());
  app.use(cors());
  

  app.use("/api/auth", authRoute);
  app.use("/api/users", userRoute);
  app.use("/api/products", productRoute);
  app.use("/api/orders", orderRoute);
  app.use("/api/cart", cartRoute);
  app.use("/api/checkout", stripeRoute);


  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
  });

  
app.listen(process.env.PORT || 5000, () => {
  console.log("backend running");
});

