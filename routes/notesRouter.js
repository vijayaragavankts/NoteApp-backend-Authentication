const express = require("express");
const Note = require("../models/noteSchema");
const User = require("../models/userSchema");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("notes");
});

router.get("/create", (req, res) => {
  res.render("create");
});

router.post("/create", async (req, res) => {
  const { content } = req.body;
  const id = req.session.userId;
  const user = await User.findOne({ _id: id });
  if (!user) {
    console.log("User not exists");
  } else {
    const note = await new Note({ content });
    await note.save();
    await user.note.push(note._id);
    await user.save();
  }

  res.redirect("/notes");
});

router.get("/show", async (req, res) => {
  const user = await User.findOne({ _id: req.session.userId }).populate("note");

  if (!user.note) {
    // there is no note to show for this user, so make them to create first.
    // some issue here
    res.redirect("/notes/create");
  } else {
    console.log();
    const iter = user.note;
    res.render("showpage", { iter });
  }
});

router.get("/show/:id", async (req, res) => {
  const { id } = req.params;
  const note = await Note.findById(id);
  res.render("singleNote", { note });
});

// edit
router.get("/:id/edit", async (req, res) => {
  const { id } = req.params;
  const note = await Note.findById(id);
  res.render("editSingleNote", { note });
});

router.put("/:id/edit", async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const note = await Note.findByIdAndUpdate(id, req.body);
  res.redirect("/notes");
});

// delete
router.delete("/:id/delete", async (req, res) => {
  const { id } = req.params;
  const note = await Note.findByIdAndDelete(id);
  res.redirect("/notes");
});
module.exports = router;
