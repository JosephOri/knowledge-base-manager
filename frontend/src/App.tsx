import { useEffect, useState } from 'react';
import ArticleList from './components/ArticleList';
import { SearchBar } from './components/SearchBar';
import { useArticles } from './hooks/articleHooks';
import { Box } from '@mui/material';

const App = () => {
  const { data: articles = [], isLoading, error } = useArticles();
  const [displayedArticles, setdisplayedArticles] = useState(articles);

  useEffect(() => {
    setdisplayedArticles(articles);
  }, [articles]);

  const handleSearch = (query: string) => {
    const filteredArticles = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.content.toLowerCase().includes(query.toLowerCase()) ||
        article.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
    );
    setdisplayedArticles(filteredArticles);
  };

  if (isLoading) return <div>Loading articles...</div>;
  if (error) return <div>Error loading articles: {error.message}</div>;

  return (
    <Box>
      <SearchBar onSearch={handleSearch} />
      <ArticleList articles={displayedArticles} />
    </Box>
  );
};

export default App;
