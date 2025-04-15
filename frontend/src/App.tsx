import { useEffect, useState } from 'react';
import ArticleList from './components/ArticleList';
import { SearchBar } from './components/SearchBar';
import { useArticles, useCreateArticle } from './hooks/articleHooks';
import { Article } from './types/Article';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { ArticleForm } from './components/ArticleForm';
import Loading from './components/Loading';
import ErrorDisplay from './components/ErrorDisplay';

const App = () => {
  const { data: articles = [], isLoading, error } = useArticles();
  const { mutateAsync: createArticle, isPending, error: createError } = useCreateArticle();
  const [displayedArticles, setdisplayedArticles] = useState<Article[]>([]);
  const [showForm, setShowForm] = useState(false);

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
    <Grid container spacing={2} direction={'column'} sx={{ padding: 3 }}>
      <SearchBar onSearch={handleSearch} />
      <ArticleList articles={displayedArticles} />
      <Button variant="contained" onClick={() => setShowForm(!showForm)} sx={{ marginBottom: 2, width: '20%' }}>
        {showForm ? 'Cancel' : 'Add New Article'}
      </Button>

      {showForm && (
        <ArticleForm
          onSubmit={async (newArticle: Omit<Article, 'id'>) => {
            await createArticle(newArticle);
            window.location.reload();
          }}
          isPending={isPending}
          error={createError ?? undefined}
        />
      )}
    </Grid>
  );
};

export default App;
