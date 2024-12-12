import express from 'express';
import multer from 'multer';
import cors from 'cors';

import pool from './DB/db.js';

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

app.post('/api/upload', upload.single("image"), (req, res) => {
    // const { path,    } = req.file;
    console.log(req.file?.path);
    res.send("File uploaded");
})


app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
})