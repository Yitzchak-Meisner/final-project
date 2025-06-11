import express from 'express';
import cors from 'cors';
import picturesRouter from './routes/api-pictures';
import usersRouter from './routes/api-users';
import messagesRouter from './routes/api-messages';
import postsRouter from './routes/api-posts';

const app = express();

app.use(cors({  origin: 'http://localhost:5173 '}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/pictures', picturesRouter);
app.use('/api/users', usersRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/posts', postsRouter);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});