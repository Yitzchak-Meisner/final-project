import { Request, Response } from "express";
import { imagekit } from "../config/imagekit";

export const uploadImage = async (req: Request, res: Response) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const uploadResponse = await imagekit.upload({
      file: file.buffer, // התוכן של הקובץ (Buffer)
      fileName: file.originalname, // שם מקורי
    });

    res.status(200).json({ url: uploadResponse.url });
  } catch (error) {
    console.error("Image upload error:", error);
    res.status(500).json({ message: "Image upload failed", error });
  }
};
