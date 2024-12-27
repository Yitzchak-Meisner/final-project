import express from 'express';
import pool from '../db/db';
import { handleError } from '../errors/errors';
import { authorizeAdmin } from '../middlewares/authorizeAdmin';

const router = express.Router();

// קבלת כל ההודעות
router.get('/', authorizeAdmin, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM messages ORDER BY sended_at DESC');
        res.json({
            success: true,
            data: result.rows,
        });
        
    } catch (error) {
        handleError(res, error, 'Unable to fetch messages. Please try again later.');
    }
});

// יצירת הודעה חדשה
router.post('/', async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return handleError(res, null, 'All fields are required.', 400);
    }
    try {
        const result = await pool.query(
            'INSERT INTO messages (name, email, message) VALUES ($1, $2, $3) RETURNING *',
            [name, email, message]
        );
        res.status(201).json({
            success: true,
            data: result.rows[0],
        });
    } catch (error) {
        handleError(res, error, 'Failed to create the message. Please try again later.');
    }
});

// עדכון סטטוס הודעה
router.put('/:id', authorizeAdmin, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const result = await pool.query(
            'UPDATE messages SET status = $1 WHERE id = $2 RETURNING *',
            [status, id]
        );
        if (result.rowCount === 0) {
            return handleError(res, null, 'Message not found', 404);
        }
        res.json(result.rows[0]);
    } catch (error) {
        handleError(res, error, 'Failed to update the message status.');
    }
});

// מחיקת הודעה
router.delete('/:id', authorizeAdmin, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM messages WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            return handleError(res, null, 'Message not found', 404);
        }
        res.status(204).send();
    } catch (error) {
        handleError(res, error, 'Failed to delete the message.');
    }
});


export default router;
