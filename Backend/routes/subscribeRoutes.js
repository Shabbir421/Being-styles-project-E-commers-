/** @format */

const express = require("express");
const Subscriber = require("../models/Subscriber");
const router = express.Router();

//route post /api/subscribe
//desc handle newsletter
//access public

router.post("/subscribe", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ msg: "Please provide an email" });
  }
  //check if email already exists in db
  try {
    let subscriber = await Subscriber.findOne({ email });
    if (subscriber) {
      return res.status(400).json({ msg: "Email already subscribed" });
    }
    //if not, create a new subscriber and save to db
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();
    res.status(201).json({ msg: "Subscribed successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
