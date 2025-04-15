import { Router, Request, Response } from 'express';
import fs from 'fs';
import { Article } from '../interfaces/Article';

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

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json(articles);
});

router.get('/:id', (req: Request, res: Response) => {
  const article = articles.find((a) => a.id === req.params.id);
  if (article) {
    res.json(article);
  } else {
    res.status(404).json({ message: 'Article not found' });
  }
});

router.post('/', (req: Request, res: Response) => {
  const { title, content, tags } = req.body;
  const id = getNextId(articles);
  const newArticle: Article = { id, title, content, tags };
  articles.push(newArticle);
  saveToFile();
  res.status(201).json(newArticle);
});

router.put('/:id', (req: Request, res: Response) => {
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

router.delete('/:id', (req: Request, res: Response) => {
  const index = articles.findIndex((a) => a.id === req.params.id);
  if (index !== -1) {
    articles.splice(index, 1);
    saveToFile();
    res.json({ message: 'Article deleted' });
  } else {
    res.status(404).json({ message: 'Article not found' });
  }
});

router.get('/search', (req: Request, res: Response) => {
  const query = req.query.q;
  if (typeof query !== 'string' || !query.trim()) {
    return res.status(400).json({ message: 'Query parameter "q" is required' });
  }
  const queryLower = query.toLowerCase();
  if (!query) {
    return res.status(400).json({ message: 'Query parameter "q" is required' });
  }
  const results = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(query) ||
      article.content.toLowerCase().includes(query) ||
      article.tags.some((tag) => tag.toLowerCase() === query)
  );
  res.json(results);
});

export default router;
