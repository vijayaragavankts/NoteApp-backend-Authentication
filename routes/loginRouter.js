const express = require("express");
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const session = require("express-session");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("login");
});
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("User Not Exists");
    }
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      req.session.userId = user._id;
      res.redirect("/notes");
    } else {
      res.redirect("/home");
    }
  } catch (err) {
    console.log(err);
    res.send("Error !");
  }
});

module.exports = router;
