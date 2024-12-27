import express, { Request, Response } from 'express';
import pool from '../db/db';
import { PoolClient } from 'pg';
import { authorizeAdmin } from '../middlewares/authorizeAdmin';

const router = express.Router();


// הגדרת ממשק לטופס
interface CreatePostRequest {
  title: string;
  description: string;
  category: string;
  images: string[];
}

// מסלול ליצירת פוסט
router.post('/create-posts', authorizeAdmin, async(req: Request<{}, {}, CreatePostRequest>, res: Response) => {
  const { title, description, category, images } = req.body as CreatePostRequest;

  // ולידציה של הנתונים
  if (!title || !description || !category || images.length === 0) {
      res.status(400).json({ error: 'יש למלא את כל השדות ולהעלות לפחות תמונה אחת' });
      return;
  }

  let client: PoolClient | undefined;

  try {
    // קבלת חיבור מהבריכה
    client = await pool.connect();

    // תחילת טרנזקציה
    await client.query('BEGIN');

    // שמירת הפוסט בטבלת posts
    const insertPostQuery = `
      INSERT INTO posts (title, description, category, created_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING id, category
    `;
    const postResult = await client.query(insertPostQuery, [title, description, category]);
    const postId = postResult.rows[0].id;
    const postCategory = postResult.rows[0].category;

    // שמירת התמונות בטבלת images
    const insertImageQuery = `
      INSERT INTO images (post_id, url, category, created_at)
      VALUES ($1, $2, $3, NOW())
    `;
    for (const image of images) {
      await client.query(insertImageQuery, [postId, image, postCategory]);
    }

    // סיום טרנזקציה
    await client.query('COMMIT');

    res.status(201).json({ message: 'הפוסט נוצר בהצלחה', postId });
  } catch (error) {
    if (client) {
      await client.query('ROLLBACK'); // מחזירים אחורה במקרה של שגיאה
    }
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'שגיאה ביצירת הפוסט' });
  } finally {
    client?.release(); // משחררים את החיבור חזרה לבריכה
  }
});


router.get('/', async (req, res) => {
  const category = req.query.category;
    try {
      const query = `
        SELECT p.id, p.title, p.description, p.category, p.created_at, 
               json_agg(i.url) AS images
        FROM posts p
        LEFT JOIN images i ON p.id = i.post_id
        WHERE p.category = $1
        GROUP BY p.id
        ORDER BY p.created_at DESC;
      `;
      const result = await pool.query(query, [category]);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'שגיאה בשליפת הפוסטים' });
    }
});



export default router;
