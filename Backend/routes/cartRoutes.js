/** @format */

const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
// post for addtocart
router.post("/add", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    // 1️⃣ Validate input
    if (!productId || !quantity || quantity < 1) {
      return res.status(400).json({ msg: "Invalid request data" });
    }

    // 2️⃣ Find the product in the database
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    // 3️⃣ Get or create the cart (by userId or guestId)
    let cart = await getCart(userId, guestId);

    if (cart) {
      // 4️⃣ Check if the product is already in the cart
      const productIndex = cart.products.findIndex(
        (item) =>
          item.productId.toString() === productId &&
          item.size === size &&
          item.color === color
      );

      if (productIndex > -1) {
        // If product exists, update quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        // Otherwise, add new product
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0]?.url || "", // Ensure it doesn't break
          price: product.price,
          size,
          color,
          quantity,
        });
      }

      // 5️⃣ Update total price
      cart.totalPrice = parseFloat(
        cart.products
          .reduce((acc, item) => acc + item.price * item.quantity, 0)
          .toFixed(2)
      );

      await cart.save();
      return res.status(200).json(cart);
    } else {
      // 6️⃣ Create a new cart if one doesn't exist
      const newCart = await Cart.create({
        user: userId || undefined,
        guestId: guestId || "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0]?.url || "",
            price: parseFloat(product.price.toFixed(2)),
            size,
            color,
            quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });

      return res.status(201).json(newCart);
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Server error" });
  }
});

// helper function to get a cart by user id or guest id

const getCart = async (userId, guestId) => {
  //find cart by userId or guestId
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  } else {
    return null;
  }
};

// route post /api/cart
//desc add product to cart for guest or logged in user
//access public

router.post("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;
  try {
    //find product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    //find user cart or create new one
    let cart = await getCart(userId, guestId);

    // if cart exist ,update it
    if (cart) {
      const productIndex = cart.products.findIndex(
        (item) =>
          item.productId.toString() === productId &&
          item.size === size &&
          item.color === color
      );
      if (productIndex > -1) {
        //product already exists update quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          size,
          color,
          quantity,
        });
      } // recalculate total price
      cart.totalPrice = parseFloat(
        cart.products
          .reduce((acc, item) => acc + item.price * item.quantity, 0)
          .toFixed(2)
      );

      await cart.save();
      return res.status(200).json(cart);
    } else {
      // create a new cart for guest or user
      const newCart = await Cart.create({
        user: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            price: product.price,
            size,
            color,
            quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });
      return res.status(201).json(newCart);
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Server error" });
  }
});

// route get /api/cart
// desc update product quantity in cart for guest or logged in user
//access public

router.put("/", async (req, res) => {
  const { userId, guestId, productId, quantity, size, color } = req.body;
  try {
    let cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }
    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );
    if (productIndex > -1) {
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity;
      } else {
        cart.products.splice(productIndex, 1); // remove product if quantity 0
      }
      cart.totalPrice = parseFloat(
        cart.products
          .reduce((acc, item) => acc + item.price * item.quantity, 0)
          .toFixed(2)
      );

      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ msg: "Product not found in cart" });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Server error" });
  }
});

// route delete /api/cart
// desc remove product from cart
// access public

router.delete("/", async (req, res) => {
  const { userId, guestId, productId, size, color } = req.body;
  try {
    let cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }
    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );
    if (productIndex > -1) {
      cart.products.splice(productIndex, 1); // remove product if quantity 0
      cart.totalPrice = parseFloat(
        cart.products
          .reduce((acc, item) => acc + item.price * item.quantity, 0)
          .toFixed(2)
      );

      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ msg: "Product not found in cart" });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Server error" });
  }
});

// route get /api/cart
//desc get looged in users or guest users cart
//access public
router.get("/", async (req, res) => {
  const { userId, guestId } = req.query;
  try {
    const cart = await getCart(userId, guestId);
    if (cart) {
      res.json(cart);
    } else {
      return res.status(404).json({ msg: "Cart not found" });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Server error" });
  }
});

// route post /api/cart/merge
//desc merge guest cart into user cart login
//access private

router.post("/merge", protect, async (req, res) => {
  const { guestId } = req.body; // Guest cart ID from frontend

  try {
    // Find the guest cart
    const guestCart = await Cart.findOne({ guestId });

    // Find the logged-in user's cart
    let userCart = await Cart.findOne({ user: req.user._id });

    if (guestCart) {
      if (guestCart.products.length === 0) {
        return res.status(400).json({ msg: "Guest cart is empty" });
      }

      if (userCart) {
        // Merge guest cart into user cart
        guestCart.products.forEach((guestItem) => {
          const productIndex = userCart.products.findIndex(
            (item) =>
              item.productId.toString() === guestItem.productId.toString() &&
              item.size === guestItem.size &&
              item.color === guestItem.color
          );

          if (productIndex > -1) {
            // Product exists in user cart, update quantity
            userCart.products[productIndex].quantity += guestItem.quantity;
          } else {
            // Otherwise, add guest cart item to user cart
            userCart.products.push(guestItem);
          }
        });

        // Recalculate total price
        userCart.totalPrice = parseFloat(
          userCart.products
            .reduce((acc, item) => acc + item.price * item.quantity, 0)
            .toFixed(2)
        );

        // Save the updated user cart
        await userCart.save();

        // Remove guest cart after merging
        try {
          await Cart.findOneAndDelete({ guestId });
        } catch (err) {
          console.error("Failed to delete guest cart:", err.message);
        }
        res.status(200).json(userCart);
      } else {
        // If the user doesn't have a cart, assign the guest cart to the user
        guestCart.user = req.user._id;
        guestCart.guestId = undefined; // Remove guestId
        await guestCart.save();

        return res.status(200).json(guestCart);
      }
    } else {
      if (userCart) {
        return res.status(200).json(userCart); // Guest cart already merged
      }
      return res.status(404).json({ msg: "Guest cart not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
});
module.exports = router;
