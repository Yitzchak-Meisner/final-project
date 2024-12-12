import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

import pool from '../../db/db.js';
const app = express();

app.use(cors());
app.use(express.json());


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../../images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const upload = multer({ storage });

app.post('/api/upload', upload.single("image"),  async (req, res) => {
    const id = uuidv4().toString();
    const path = req.file?.path;
    const { category, dateNow } = req.body;
    console.log([ id, path, category, dateNow ]);

    try {
        const result = await pool.query('INSERT INTO images (id, image_url, category, dateNow) VALUES ($1, $2, $3, $4) RETURNING *;', [id, path, category, dateNow]);
        console.log(result);
        
        res.send(result.rows).status(201);
    } catch (err) {
        // Type check the error
        if (err instanceof Error) {
            console.error(err.message);
        } else {
            console.error('An unknown error occurred');
        }
        res.status(500).send('Server Error');
    }
    
    res.send("File uploaded");
})


app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
})