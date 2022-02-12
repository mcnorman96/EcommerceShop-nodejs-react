const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

//REGISTER 
router.post("/register", async (req, res) => {
  /* 
    Using cryptojs to encrypt password to not see it if db is getting hacked. 
  */
  const newUser = new User({
    username: req.body.username, 
    email: req.body.email, 
    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
  });

  /*
  Using the save method to store data in our database cannot be done directly. Because to save the user takes a couple of seconds depending on different parameters as network connection, the server and mongodb servers. So we pass async the router and await to the variable. 
  */
  try {
    const savedUser = await newUser.save();
    console.log(savedUser);
    res.status(201).json(savedUser); // 200 is accessible and 201 is for succesfully edit
  }catch(err){
    res.status(500).json(err);
  }
  
});

//LOGIN
router.post("/login", async (req, res) => {

  /*
  Using the save method to store data in our database cannot be done directly. Because to save the user takes a couple of seconds depending on different parameters as network connection, the server and mongodb servers. So we pass async the router and await to the variable. 
  */
  try {
    const user = await User.findOne({ username: req.body.username }) ;
    !user && res.status(401).json("Wrong credentials");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password, 
      process.env.PASS_SEC
    ); 

    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    OriginalPassword!== req.body.password &&
     res.status(401).json("Wrong credentials");

      const accesstoken = jwt.sign(
        {
          id:user._id, 
          isAdmin: user.isAdmin, 
        }, 
        process.env.JWT_SEC, 
        {expiresIn:"3d"}
      );

     const { password, ...others } = user._doc;

     res.status(200).json({...others, accesstoken});

  }catch(err){
    res.status(500).json(err);
  }
  
});

module.exports = router;
