const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const JWT = "inotebook";
//Creation of User
router.post(
  "/signup",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success,error: "Duplicate User Found" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT);
      success = true;
      res.json({ success,authToken });
    } catch (error) {
      //console.error(error.message);
      res.status(500).send("Some Error Occured");
    }
  }
);

//Login a User
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(500).send("Incorrect Credentials");
      }
      const passwordCom = await bcrypt.compare(password, user.password);
      if (!passwordCom) {
        success = false;
        return res.status(500).send({success,error:"Incorrect Credentials"});
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT);
      success = true;
      res.json({ success,authToken });
    } catch (error) {
      //console.error(error.message);
      res.status(500).send("Internel Server Error");
    }
  }
);

// User Details
router.post(
  "/getuser",fetchuser,
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      res.send(user);
    } catch (error) {
      //console.error(error.message);
      res.status(500).send("Internel Server Error");
    }
  }
);

module.exports = router;
