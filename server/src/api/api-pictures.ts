import express from 'express';
// import multer from 'multer';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

import pool from '../db/db.js';
const app = express();

app.use(cors());
// app.use(express.json());
// הגדלת מגבלת גודל JSON ל-10MB
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, '../../images')
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + "-" + file.originalname)
//     }
// })

// const upload = multer({ storage });

app.post('/api/upload', async (req, res) => {
    const id = uuidv4();
    const { image, category, uploadDate } = req.body;
  
    try {
      // שמירת המידע ב-DB
      const result = await pool.query(
        'INSERT INTO images (id, image_data, category, created_date) VALUES ($1, $2, $3, $4) RETURNING *;',
        [id, image, category, uploadDate]
      );
  
      res.status(201).send(result.rows); // מחזיר את השורה שנשמרה
    } catch (err) {
      console.error('Error saving image:', err);
      res.status(500).send('Server Error');
    }
  });


  app.get('/api/pictures', async (req, res) => {
    const category = req.query.category;
    try {
      const result = await pool.query(
        'SELECT * FROM images WHERE category = $1;',
        [category]
      );
      res.status(200).send(result.rows);
    } catch (err) {
      console.error('Error fetching images:', err);
      res.status(500).send('Server Error');
    }
  });
  


app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
})