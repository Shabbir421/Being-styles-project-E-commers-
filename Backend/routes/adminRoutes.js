/** @format */

const express = require("express");
const User = require("../models/User");
const { admin, protect } = require("../middleware/authMiddleware");

const router = express.Router();

//route get /api/admin/users
//desc all user (admin only)
//access public/private

router.get("/", protect, admin, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//route post /api/admin/users
//desc add new user admin only
//access public/admin

router.post("/", protect, admin, async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    //check for existing user
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const newUser = new User({ name, email, password, role: role || "user" });
    await newUser.save();
    res.status(201).json({ msg: "user created successfully", newUser });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//route put /api/admin/users/:id
//desc update user info like name, email, password
//access private

router.put("/:id", protect, admin, async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
    }
    await user.save();
    res.json({ msg: "User updated successfully", user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//route delete /api/admin/users/:id
//desc delete a user
//access private/admin

router.delete("/:id", protect, admin, async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    await user.deleteOne();
    res.json({ msg: "User deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
