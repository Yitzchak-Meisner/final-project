import express from 'express';
import pool from '../db/db';
import bcrypt from 'bcrypt'; // לשיבוש הסיסמה
import jwt from 'jsonwebtoken'; // ליצור טוקני כניסה
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// סוד לטוקן JWT
const JWT_SECRET : string = process.env.JWT_SECRET!;

router.get('/', async (req, res) => {
    console.log('hello');
    res.send('hello');
})

// ------------ API להרשמה ----------------
// בקשה זאת תרשום משתמש חדש
router.post('/register', async (req, res) => {
    try {
        const { full_name, email, phone, birthday, password } = req.body;

        // בדיקה שאין אימייל כפול
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            res.status(400).json({ error: 'האימייל כבר בשימוש' });
            return;
        }

        // הכנת ה-id כ-uuid
        const id = uuidv4();

        // שיבוש הסיסמה באמצעות bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        const insertQuery = `
            INSERT INTO users (id, full_name, email, phone, birthday, password, role)
            VALUES ($1, $2, $3, $4, $5, $6, 'user') RETURNING *;
        `;
        const newUser = await pool.query(insertQuery, [id, full_name, email, phone, birthday, hashedPassword]);
        
        res.json({ message: 'משתמש נרשם בהצלחה', user: newUser.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'שגיאת שרת' });
    }
});

// ------------ API לכניסה ----------------
// בקשה זאת תתחבר על בסיס אימייל וסיסמה ותוציא JWT
router.post('/login', async (req, res) => {

    const { emailOrName, password } = req.body;

    if (!emailOrName || !password) {
        res.status(400).json({ error: 'אנא מלא את כל השדות' });
        return;
    }

    try {
        const query = `
            SELECT * FROM users 
            WHERE full_name = $1 OR email = $1`;
        const values = [emailOrName];
        const result = await pool.query(query, values);
        
        if (result.rows.length === 0) {
            res.status(401).json({ error: 'שם משתמש או סיסמה שגויים' });
            return;
          }


        const user = result.rows[0];

        // בדיקת הסיסמה
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ error: 'סיסמה שגויה' });
            return;
        }

        // יצירת טוקן
        const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        
        res.json({ message: 'התחברת בהצלחה', token, user: { full_name: user.full_name, email: user.email, role: user.role } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'שגיאת שרת' });
    }
});

export default router;
