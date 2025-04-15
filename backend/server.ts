import express from 'express';
import cors from 'cors';
import articleRouter from './routes/article';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/articles', articleRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
