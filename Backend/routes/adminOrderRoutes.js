/** @format */

const express = require("express");
const Order = require("../models/Order");
const { admin, protect } = require("../middleware/authMiddleware");

const router = express.Router();

// @route GET /api/admin/orders
//desc get all order
//access private /admin

router.get("/", protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email");
    res.json(orders);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route PUT /api/admin/orders/:id
// @desc Update order status
// @access Private/Admin

router.put("/:id", protect, admin, async (req, res) => {
  try {
    // Check if order exists
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    // Update order status
    if (req.body.status) {
      order.status = req.body.status;
      order.isDelivered = req.body.status === "Delivered";
      order.deliveredAt = req.body.status === "Delivered" ? Date.now() : order.deliveredAt;
    }

    // Save updated order
    const updatedOrder = await order.save();
    
    // Send updated order back to frontend
    return res.json(updatedOrder);

  } catch (error) {
    console.error("Error updating order:", error);
    return res.status(500).json({ msg: "Server Error", error: error.message });
  }
});


// @route DELETE /api/admin/orders/:id
//desc Delete a order
//access private admin

router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (order) {
      res.json({ msg: "Order deleted" });
    } else {
      return res.status(404).json({ msg: "Order not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
