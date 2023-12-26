const express = require("express");
const User = require("../models/userSchema");

const router = express();

router.get("/", (req, res) => {
  res.render("register");
});
router.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  const user = await new User({
    username,
    email,
    password,
  });
  // hashing the password in the schema file
  await user.save();
  req.session.userId = user._id;
  console.log(req.session.userId);
  res.redirect("/notes");
});

module.exports = router;
