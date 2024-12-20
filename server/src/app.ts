import express from 'express';
import cors from 'cors';
import picturesRouter from './api/api-pictures';
import usersRouter from './api/api-users';

const app = express();

app.use(cors());
// הגדלת מגבלת גודל JSON ל-10MB
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));

app.use('/api/pictures', picturesRouter);
app.use('/api/users', usersRouter);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});