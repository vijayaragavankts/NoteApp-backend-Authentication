const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  note: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Note",
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next(); // Skip password hashing if the password field is not modified
  }
  const salt = await bcrypt.genSalt(10);
  const hashedpw = await bcrypt.hash(this.password, salt);
  this.password = hashedpw;
  console.log(hashedpw);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
