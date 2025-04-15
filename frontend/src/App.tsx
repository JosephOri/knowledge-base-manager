import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ArticleList from './components/ArticleList';
import { SearchBar } from './components/SearchBar';
import { useArticles } from './hooks/articleHooks';
import { Article } from './types/Article';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import ArticleForm from './components/ArticleForm';
import { EditArticleForm } from './components/EditArticleForm';
import Loading from './components/Loading';
import ErrorDisplay from './components/ErrorDisplay';

const App = () => {
  const { data: articles = [], isLoading, error } = useArticles();
  const [displayedArticles, setdisplayedArticles] = useState<Article[]>([]);

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

  if (isLoading) return <Loading />;
  if (error) return <ErrorDisplay error={error} />;

  return (
    <Router>
      <Grid container spacing={2} direction={'column'} sx={{ padding: 3 }}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar onSearch={handleSearch} />
                <ArticleList articles={displayedArticles} />
                <Button variant="contained" component={Link} to="/create" sx={{ marginBottom: 2, width: '20%' }}>
                  Add New Article
                </Button>
              </>
            }
          />
          <Route path="/edit/:id" element={<EditArticleForm />} />
          <Route path="/create" element={<ArticleForm />} />
        </Routes>
      </Grid>
    </Router>
  );
};

export default App;
