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

// Add this endpoint to api-posts.ts

router.delete('/:id', authorizeAdmin, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { keepImages } = req.query;
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    if (keepImages === 'true') {
      // Update images to remove post_id reference but keep the images
      await client.query(
        'UPDATE images SET post_id = NULL WHERE post_id = $1',
        [id]
      );
    } else {
      // Delete all images associated with the post
      await client.query('DELETE FROM images WHERE post_id = $1', [id]);
    }

    // Delete the post
    const result = await client.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      await client.query('ROLLBACK');
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    await client.query('COMMIT');
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Error deleting post' });
  } finally {
    client.release();
  }
});


router.get('/latest', async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 5;
  const offset = (page - 1) * limit;

  try {
    const query = `
      SELECT p.id, p.title, p.description, p.category, p.created_at, 
             json_agg(i.url) AS images
      FROM posts p
      LEFT JOIN images i ON p.id = i.post_id
      GROUP BY p.id
      ORDER BY p.created_at DESC
      LIMIT $1 OFFSET $2;
    `;
    const result = await pool.query(query, [limit, offset]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching latest posts:', error);
    res.status(500).json({ error: 'שגיאה בשליפת הפוסטים האחרונים' });
  }
});


export default router;
