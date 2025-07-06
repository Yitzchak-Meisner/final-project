import multer from "multer";

// שמירה בזיכרון (Buffer) – לא בקובץ זמני בדיסק
const storage = multer.memoryStorage();

export const upload = multer({ storage });
