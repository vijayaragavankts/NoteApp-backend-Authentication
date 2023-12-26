const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const methodoverride = require("method-override");
const homeRouter = require("./routes/homeRouter");
const registerRouter = require("./routes/registerRouter");
const loginRouter = require("./routes/loginRouter");
const notesRouter = require("./routes/notesRouter");
const protect = require("./middleware/authmiddleware");

mongoose
  .connect("mongodb://localhost:27017/notesApp")
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(
  session({ secret: "THISISASECRET", resave: false, saveUninitialized: true })
);
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride("_method"));

app.use("/home", homeRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/notes", protect, notesRouter);

app.listen(5000, () => {
  console.log("Server running in PORT 5000");
});
