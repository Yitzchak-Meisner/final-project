import express from 'express';
import { v4 as uuidv4 } from 'uuid';

import pool from '../db/db.js';
const router = express.Router();

router.post('/upload', async (req, res) => {
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


  router.get('/', async (req, res) => {
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
  
  router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    
    try {
      const result = await pool.query('DELETE FROM images WHERE id = $1;', [id]);
      console.log(result);
      
      res.status(200).send(result.rows);
    } catch (err) {
      console.error('Error deleting image:', err);
      res.status(500).send('Server Error');
    }
  });

export default router;
