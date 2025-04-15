import { useState } from 'react';
import ArticleList from './components/ArticleList';
import { SearchBar } from './components/SearchBar';
import { useArticles, useSearchArticles } from './hooks/articleHooks';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: articles = [], isLoading, error } = useArticles();
  const { data: searchResults } = useSearchArticles(searchQuery);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const displayedArticles = searchQuery ? searchResults || [] : articles;

  if (isLoading) return <div>Loading articles...</div>;
  if (error) return <div>Error loading articles: {error.message}</div>;

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <ArticleList articles={displayedArticles} />
    </div>
  );
};

export default App;
