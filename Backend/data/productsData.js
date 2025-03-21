/** @format */

const products = [
  {
    name: "Nike Running Shoes",
    description: "Lightweight and comfortable running shoes for everyday use.",
    price: 120.99,
    discountPrice: 99.99,
    countInStock: 50,
    category: "Footwear",
    sku: "NIKE-RUN-2025-BLK",
    brand: "Nike",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Blue"],
    collection: "Spring 2024",
    material: "Mesh,Rubber",
    gender: "Men", // ✅ Fixed enum value
    images: [
      {
        url: "https://img.freepik.com/free-photo/shoes_1203-8153.jpg?ga=GA1.1.2025290381.1723484611&semt=ais_hybrid",
        altText: "Nike Running Shoes",
      },
    ],
    rating: 4.5,
    numReviews: 120,
  },
  {
    name: "Adidas Ultraboost Sneakers",
    description: "High-performance sneakers for comfort and style.",
    price: 150.0,
    discountPrice: 129.99,
    countInStock: 30,
    sku: "ADIDAS-ULTRA-2025-GRY",
    category: "Apparel",
    brand: "Adidas",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Grey", "Black"],
    collection: "Summer 2024",
    material: "Primeknit, Rubber",
    gender: "Women", // ✅ Fixed enum value
    images: [
      {
        url: "https://img.freepik.com/premium-photo/black-women-s-sneakers-white-isolated-background_262193-186.jpg?ga=GA1.1.2025290381.1723484611&semt=ais_hybrid",
        altText: "Adidas Ultraboost Sneakers - Grey",
      },
      {
        url: "https://img.freepik.com/premium-photo/black-women-s-sneakers-white-isolated-background_262193-186.jpg?ga=GA1.1.2025290381&semt=ais_hybrid",
        altText: "Adidas Ultraboost Sneakers - Black",
      },
    ],
    rating: 4.8,
    numReviews: 200,
  },
  {
    name: "Puma Sports Jacket",
    description: "Breathable sports jacket with moisture-wicking technology.",
    price: 89.99,
    discountPrice: 74.99,
    countInStock: 20,
    sku: "PUMA-JACKET-2025-RED",
    category: "Apparel",
    brand: "Puma",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Red", "Black"],
    collection: "Winter 2023",
    material: "Polyester",
    gender: "Men", // ✅ Fixed enum value
    images: [
      {
        url: "https://img.freepik.com/premium-photo/suede-shoes-white-background_488220-3877.jpg?w=996",
        altText: "Puma Sports Jacket - Red",
      },
      {
        url: "https://img.freepik.com/premium-photo/black-women-s-sneakers-white-isolated-background_262193-186.jpg?ga=GA1.1.2025290381.1723484611&semt=ais_hybrid",
        altText: "Puma Sports Jacket - Black",
      },
    ],
    rating: 4.2,
    numReviews: 75,
  },
  {
    name: "Under Armour Gym Shorts",
    description: "Lightweight gym shorts with sweat-absorbing technology.",
    price: 45.0,
    discountPrice: 39.99,
    countInStock: 60,
    sku: "UA-SHORTS-2025-BLK",
    category: "Apparel",
    brand: "Under Armour",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Grey"],
    collection: "Fitness 2024",
    material: "Polyester, Elastane",
    gender: "Women", // ✅ Fixed enum value
    images: [
      {
        url: "https://img.freepik.com/premium-photo/sporty-blue-sneakers-pair-orange-background-jogging-shoes_474717-18461.jpg?w=1800",
        altText: "Under Armour Gym Shorts - Black",
      },
      {
        url: "https://img.freepik.com/premium-photo/black-women-s-sneakers-white-isolated-background_262193-186.jpg?ga=GA1.1.2025290381.1723484611&semt=ais_hybrid",
        altText: "Under Armour Gym Shorts - Grey",
      },
    ],
    rating: 4.6,
    numReviews: 90,
  },
];

// Export the products array as a module

module.exports = products;
