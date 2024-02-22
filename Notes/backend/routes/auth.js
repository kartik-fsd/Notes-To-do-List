const express = require("express");
const router = express.Router();
const User = require("../models/UserSchema");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchUser = require("../middleware/fetchUser");
const JWT_SECTRETKEY = "Kartik@123.io";
//Route 3:Create a user using post:/auth/createUser :no login required
router.post(
  "/createUser",
  [
    //name must be minimum of 3 chars
    body("name", "Enter a valid name").isLength({ min: 3 }),
    // username must be an email
    body("email", "Enter a valid email").isEmail(),
    // password must be at least 5 chars long
    body("password", "Enter a valid password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success=false
      return res.status(400).json({ success,errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success=false
        return res.status(400).json({success, error: "This email already exist" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPassw = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassw,
      });
      const data = {
        user: { id: user.id },
      };
      var Authtoken = jwt.sign(data, JWT_SECTRETKEY);
      success=true
      res.json({success, Authtoken });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  let success = false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      success = false
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECTRETKEY);
    success = true;
    res.json({ success, authtoken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }


});


//Route 3:Get loggedIn user details using post:/auth/getUser : login required

router.post("/getUser",fetchUser,async(req,res)=>{
  try {
   var  userId = req.user.id
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
      res.status(500).send("Internal server Error");
  }

})
module.exports = router;
