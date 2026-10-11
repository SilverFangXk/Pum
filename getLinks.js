import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🔥 Get all images from a folder in Cloudinary
const getLinks = async () => {
  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: "flowerShop/", // your folder in Cloudinary
      max_results: 500,
    });

    const products = result.resources.map((file) => ({
      name: file.public_id.split("/").pop(),
      imageUrl: file.secure_url,
      category: file.public_id.split("/")[1] || "unknown",
    }));

    // 💾 Save to file
    fs.writeFileSync(
      "products.json",
      JSON.stringify(products, null, 2)
    );

    console.log("✅ Links retrieved and saved!");
  } catch (err) {
    console.error("Error:", err.message);
  }
};

getLinks();