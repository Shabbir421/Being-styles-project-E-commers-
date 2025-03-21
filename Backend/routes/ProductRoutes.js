/** @format */

const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// @route post /api/products
//desc create a new Product
//access privae

router.post("/", protect, admin, async (req, res) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "Unauthorized, invalid user" });
  }
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      sku,
      weight,
    } = req.body;
    // Check for required fields
    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      sku,
      weight,
      user: req.user._id, //refresnsh to admin user
    });
    const createedProduct = await product.save();
    res.status(201).json(createedProduct);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/products/:id
//desc update an existing product
//access pvt

router.put("/:id", protect, async (req, res) => {
  try {
    //find product by id
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      sku,
      weight,
    } = req.body;
    //
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountPrice = discountPrice || product.discountPrice;
      product.countInStock = countInStock || product.countInStock;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.sizes = sizes || product.sizes;
      product.colors = colors || product.colors;
      product.collections = collections || product.collections;
      product.material = material || product.material;
      product.gender = gender || product.gender;
      product.images = images || product.images;
      product.isFeatured =
        isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.isPublished =
        isPublished !== undefined ? isPublished : product.isPublished;
      product.tags = tags || product.tags;
      product.dimensions = dimensions || product.dimensions;
      product.sku = sku || product.sku;
      product.weight = weight || product.weight;

      //save updated product
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ msg: "Product not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route DELETE /api/products/:id
//desc Delete a product
//access: private

router.delete("/:id", protect, admin, async (req, res) => {
  try {
    //find product by id
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ msg: "Product removed" });
    } else {
      res.status(404).json({ msg: "Product not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/products
//desc Get all product with optional query filters
//access: public

router.get("/", async (req, res) => {
  try {
    const {
      collections,
      gender,
      colors,
      sizes,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    } = req.query;
    let query = {};
    if (collections && collections.toLocaleLowerCase() !== "all") {
      query.collections = collections;
    }
    if (category && category.toLocaleLowerCase() !== "all") {
      query.category = category;
    }
    if (material) {
      query.material = { $in: material.split(",") };
    }
    if (brand) {
      query.brand = { $in: brand.split(",") };
    }
    if (sizes) {
      query.sizes = { $in: sizes.split(",") };
    }
    if (colors) {
      query.colors = { $in: [colors] };
    }
    if (gender) {
      query.gender = gender;
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }
      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }
    }
    if (search) {
      query.$or = [
        {
          name: { $regex: search, $options: "i" },
        },
        {
          description: { $regex: search, $options: "i" },
        },
      ];
    }
    //sort logic
    let sort = {};
    if (sortBy) {
      switch (sortBy) {
        case "priceAsc":
          sort = { price: 1 };
          break;
        case "priceDesc":
          sort = { price: -1 };
          break;
        case "popularity":
          sort = { rating: -1 };
          break;
        default:
          break;
      }
    }
    //fetch product form database
    let products = await Product.find(query)
      .sort(sort)
      .limit(Number(limit) || 0);
    res.json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//route GET /api/products/best-seller
//desc retrieve product higher rating
//access public
router.get("/best-seller", async (req, res) => {
  try {
    // Fetch the best-selling product based on highest rating
    const bestSeller = await Product.findOne().sort({ rating: -1 });
    if (!bestSeller) {
      return res.status(404).json({ msg: "No Best Seller Product found" });
    }
    res.status(200).json(bestSeller);
  } catch (error) {
    console.error("Error fetching best-seller product:", error.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

//route GET /api/products/new-available
//desc retrieve product latest
//access public

router.get("/new-arrivals", async (req, res) => {
  try {
    const newArrivals = await Product.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .limit(6);
    res.json(newArrivals);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
//route get /api/products/:id
//desc get a single product by id
//access public
router.get("/:id", async (req, res) => {
  try {
    const products = await Product.findById(req.params.id);
    if (products) {
      res.json(products);
    } else {
      res.status(404).json({ msg: "Unauthorized to view product" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// route GET /api/products/similar/:id
//desc get a single product by id
//access public

router.get("/similar/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    const similarProducts = await Product.find({
      _id: { $ne: id },
      gender: product.gender,
      category: product.category,
    }).limit(4);
    res.json(similarProducts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
