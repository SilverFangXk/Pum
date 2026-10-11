//  *********************** For FLowerImage Upload to Cloudinary ***********************


// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";
// import path from "path";
// import dotenv from "dotenv";

// dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // 📁 ROOT folder containing subfolders
// const rootFolder = "./public/flowerImage";

// // 🔁 Recursively get all image files
// const getAllFiles = (dir, fileList = []) => {
//   const files = fs.readdirSync(dir);

//   files.forEach((file) => {
//     const fullPath = path.join(dir, file);

//     if (fs.statSync(fullPath).isDirectory()) {
//       getAllFiles(fullPath, fileList);
//     } else {
//       if (file.match(/\.(jpg|jpeg|png|webp)$/)) {
//         fileList.push(fullPath);
//       }
//     }
//   });

//   return fileList;
// };

// const files = getAllFiles(rootFolder);

// // 🚀 Upload function
// const uploadImage = async (filePath) => {
//   // Extract folder structure relative to rootFolder
//   const relativePath = path.relative(rootFolder, filePath);
//   const folderName = path.dirname(relativePath).replace(/\\/g, "/"); // Convert backslashes to forward slashes

//   try {
//     const result = await cloudinary.uploader.upload(filePath, {
//       folder: `flowerShop/${folderName}`, // preserve structure
//     });

//     console.log("Uploaded:", result.secure_url);
//   } catch (err) {
//     console.error("Error uploading:", filePath, err);
//   }
// };

// // 🔁 Run uploads
// const run = async () => {
//   console.log(`Found ${files.length} images`);

//   for (const file of files) {
//     await uploadImage(file);
//   }

//   console.log("All uploads completed!");
// };

// run();



//  *********************** For HeroImage Upload to Cloudinary ***********************

// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";
// import path from "path";
// import dotenv from "dotenv";

// dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const rootFolder = path.join(process.cwd(), "public", "hero");
// const imageRegex = /\.(jpg|jpeg|png|webp)$/i;

// const files = fs.readdirSync(rootFolder)
//   .filter((file) => imageRegex.test(file))
//   .map((file) => path.join(rootFolder, file));

// const uploadImage = async (filePath) => {
//   try {
//     const result = await cloudinary.uploader.upload(filePath, {
//       folder: "hero",
//       use_filename: true,
//       unique_filename: false,
//       overwrite: false,
//     });

//     console.log("Uploaded:", result.secure_url);
//   } catch (err) {
//     console.error("Error uploading:", filePath, err);
//   }
// };

// const run = async () => {
//   console.log(`Found ${files.length} images in public/hero`);

//   for (const file of files) {
//     await uploadImage(file);
//   }

//   console.log("✅ Hero upload completed!");
// };

// run();