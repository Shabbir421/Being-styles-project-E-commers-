/** @format */

const express = require("express");
const multer = require("multer");
const streamifier = require("streamifier");
const { admin, protect } = require("../middleware/authMiddleware");
const cloudinary = require("cloudinary").v2;

require("dotenv").config();

// Set up Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Initialize router
const router = express.Router();

// Multer configuration (store file in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload route with authentication and admin protection
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }
    // Function to handle stream upload to Cloudinary
    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
        // Convert buffer to stream
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    // Upload image
    const result = await streamUpload(req.file.buffer);
    res.status(201).json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error("Image Upload Error:", error);
    res.status(500).json({ msg: "Error uploading image" });
  }
});
module.exports = router;
