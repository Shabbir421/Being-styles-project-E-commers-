/** @format */

const express = require("express");
const Checkout = require("../models/Checkout");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// @route POST /api/checkout
// @desc create new checkout session
// @acccess private

router.post("/", protect, async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
    req.body;
  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).json({ msg: "No checkout items provided" });
  }
  try {
    //create new cart for user
    const newCheckout = await Checkout.create({
      user: req.user._id,
      checkoutItems: checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "pendings",
      isPaid: false,
    });
    console.log(`checkout create for user : ${req.user._id}`);
    res.status(201).json(newCheckout);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
});

// @route put /api/checkout/:id/pay
//desc update checkout to marks as paid successful payment
//access private

router.put("/:id/pay", protect, async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;
  try {
    let checkout = await Checkout.findById(req.params.id);
    if (!checkout) return res.status(404).json({ msg: "Checkout not found" });
    if (paymentStatus === "paid") {
      checkout.isPaid = true;
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetails = paymentDetails;
      checkout.paidAt = Date.now();
      await checkout.save();
      res.status(200).json(checkout);
    } else {
      return res.status(400).json({ msg: "Payment status is not valid" });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
});

// @route post /api/checkout/:id/finalize
//desc finalize checkout and covert to order after payemt done
//access private

router.post("/:id/finalize", protect, async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout) {
      return res.status(404).json({ msg: "Checkout not found" });
    }
    if (checkout.isPaid && !checkout.isFinalized) {
      // create final order base on checkout details

      const finalOrder = await Order.create({
        user: checkout.user,
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentStatus: "paid",
        paymentDetails: checkout.paymentDetails,
      });
      //mark the checkout as finalized
      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();
      await checkout.save();
      //remove the checkout from cart

      await Cart.findOneAndDelete({
        user: checkout.user,
      });
      res.status(201).json(finalOrder);
    } else if (checkout.isFinalized) {
      return res.status(400).json({ msg: "Checkout is already finalized" });
    } else {
      return res.status(400).json({ msg: "Checkout is not paid" });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
