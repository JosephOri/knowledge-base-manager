import ArticleList from './components/ArticleList';
import { Article } from './types/Article';

const articles: Article[] = [
  {
    id: 'A1',
    title: 'How to Reset Your Password',
    content: 'Follow these steps to reset your password...',
    tags: ['account', 'password', 'security'],
  },
  {
    id: 'A2',
    title: 'Troubleshooting Login Issues',
    content: 'If you experience issues logging in, try the following steps...',
    tags: ['login', 'troubleshooting'],
  },
  {
    id: 'A3',
    title: 'Payment Processing Guide',
    content: '',
    tags: ['payment', 'checkout'],
  },
  {
    id: 'A4',
    title: '',
    content: 'This article explains how to configure email notifications.',
    tags: ['notifications', 'email'],
  },
  {
    id: 'A5',
    title: 'Using the Dashboard',
    content: 'Learn how to navigate and utilize the dashboard effectively.',
    tags: ['dashboard'],
  },
  {
    id: 'A6',
    title: 'FAQ',
    content: 'Common questions and answers about our support system.',
    tags: [],
  },
];

const App = () => {
  return (
    <div>
      <ArticleList articles={articles} />
    </div>
  );
};

export default App;
