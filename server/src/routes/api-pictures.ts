import express from 'express';
import { authorizeAdmin } from '../middlewares/authorizeAdmin'

import pool from '../db/db.js';
const router = express.Router();

router.post('/upload', authorizeAdmin, async (req, res) => {
    const { image, category } = req.body;
    // console.log(req.body);

    try {
      const result = await pool.query(
        'INSERT INTO images ( url, category, created_at) VALUES ($1, $2, NOW()) RETURNING *;',
        [ image, category]
      );

      res.status(201).send(result.rows[0]);
    } catch (err) {
      console.error('Error saving image:', err);
      res.status(500).send('Server Error');
    }
  });


  router.get('/', async (req, res) => {
    const category = req.query.category;    
    try {
      const result = await pool.query(
        `SELECT id, url, category, created_at
       FROM images 
       WHERE category = $1 
       ORDER BY created_at DESC;`,
      [category]
      );
      res.status(200).send(result.rows);
    } catch (err) {
      console.error('Error fetching images:', err);
      res.status(500).send('Server Error');
    }
  });
  
  router.delete('/delete/:id', authorizeAdmin, async (req, res) => {
    const id = req.params.id;
    
    try {
      const result = await pool.query('DELETE FROM images WHERE id = $1 RETURNING *;', [id]);
      if (result.rowCount === 0) {
        res.status(404).send('Image not found');
        return;
      }
      
      res.status(200).send(result.rows);
    } catch (err) {
      console.error('Error deleting image:', err);
      res.status(500).send('Server Error');
    }
  });

export default router;
