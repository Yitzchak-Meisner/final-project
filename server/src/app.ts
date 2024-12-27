import express from 'express';
import cors from 'cors';
import picturesRouter from './routes/api-pictures';
import usersRouter from './routes/api-users';
import messagesRouter from './routes/api-messages';
import postsRouter from './routes/api-posts';

const app = express();

app.use(cors());
// הגדלת מגבלת גודל JSON ל-10MB
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));

app.use('/api/pictures', picturesRouter);
app.use('/api/users', usersRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/posts', postsRouter);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});