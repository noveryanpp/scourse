import cloudinary from "cloudinary";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve("../.env") });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (path, folder = "scourse") => {
  try {
    const data = await cloudinary.uploader.upload(
        path, 
        { 
            folder: folder, 
        });
    return { url: data.secure_url, publicId: data.public_id };
  } catch (err) {
    console.log(err);
    throw err;
  }
};
