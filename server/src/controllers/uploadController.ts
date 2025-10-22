import { Request, Response } from "express";

export const uploadImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const file = req.file;

    if (!file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    // דוגמה להעלאה ל־ImageKit
    // const result = await imagekit.upload({ file: file.buffer, fileName: file.originalname });

    res.status(200).json({ message: "Upload successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed" });
  }
};
