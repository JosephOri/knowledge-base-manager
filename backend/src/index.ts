import express, { Request, Response } from 'express';
import cors from 'cors';

import articleRoute from './routes/articleRoute';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/articles', articleRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.listen(3001, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
