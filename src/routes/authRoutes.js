/** @format */

const express = require("express");
const passport = require("../middleware/authMiddleware");
const jwt = require("jsonwebtoken");
const config = require("../config/index");
const User = require("../models/userModal");

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log(username, passport);

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    const token = jwt.sign({ sub: req.user._id }, config.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  }
);

module.exports = router;
