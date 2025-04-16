import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
interface Article {
  id: string;
  title: string;
  content: string;
  tags: string[];
}

let articles: Article[];
try {
  const data = fs.readFileSync('knowledgebase.json', 'utf8');
  const json = JSON.parse(data);
  articles = json.articles || [];
} catch (err) {
  if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
    articles = [];
  } else {
    throw err;
  }
}

function saveToFile(): void {
  fs.writeFileSync('knowledgebase.json', JSON.stringify({ articles }, null, 2), 'utf8');
}

function getNextId(articles: Article[]): string {
  if (articles.length === 0) return 'A1';
  const maxId = articles.reduce((max, article) => {
    const num = parseInt(article.id.slice(1));
    return num > max ? num : max;
  }, 0);
  return `A${maxId + 1}`;
}

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/articles', (req: Request, res: Response) => {
  res.json(articles);
});

app.get('/articles/:id', (req: Request, res: Response) => {
  const article = articles.find((a) => a.id === req.params.id);
  if (article) {
    res.json(article);
  } else {
    res.status(404).json({ message: 'Article not found' });
  }
});

app.post('/articles', (req: Request, res: Response) => {
  const { title, content, tags } = req.body;
  const id = getNextId(articles);
  const newArticle: Article = { id, title, content, tags };
  articles.push(newArticle);
  saveToFile();
  res.status(201).json(newArticle);
});

app.put('/articles/:id', (req: Request, res: Response) => {
  const { title, content, tags } = req.body;
  const index = articles.findIndex((a) => a.id === req.params.id);
  if (index !== -1) {
    articles[index] = { id: req.params.id, title, content, tags };
    saveToFile();
    res.json(articles[index]);
  } else {
    res.status(404).json({ message: 'Article not found' });
  }
});

app.delete('/articles/:id', (req: Request, res: Response) => {
  const index = articles.findIndex((a) => a.id === req.params.id);
  if (index !== -1) {
    articles.splice(index, 1);
    saveToFile();
    res.json({ message: 'Article deleted' });
  } else {
    res.status(404).json({ message: 'Article not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
