/** @format */

const express = require("express");
const Checkout = require("../models/Checkout");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// @route GET /api/orders/my-order
//desc get logged in users order
//access private

router.get("/my-orders", protect, async (req, res) => {
  try {
    //find order for authenticated user
    const orders = await Order.findOne({ user: req.user._id }).sort({
      createdAt: -1,
    }); //sort by recent order
    res.json(orders || []);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route get /api/orders/:id
// desc get order details by id
//access private

router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }
    //return order full details

    res.json(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
