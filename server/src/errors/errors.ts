import express from 'express';

export const handleError = (res: express.Response, error: unknown, message: string, statusCode: number = 400) => {
    console.error(error); // שמירת השגיאה בלוג
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(statusCode).json({
        success: false,
        message,
        error: errorMessage, // הוספת הודעת שגיאה מהאובייקט, אם קיימת
    });
};
