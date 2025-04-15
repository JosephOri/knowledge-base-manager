import { Article } from '../types/Article';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import ArticleCard from './ArticleCard';

interface Props {
  articles: Article[];
}

const ArticleList = ({ articles }: Props) => {
  return (
    <Grid container spacing={2} padding={2}>
      {articles.length > 0 ? (
        articles.map((article) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={article.id}>
            <ArticleCard article={article} />
          </Grid>
        ))
      ) : (
        <Grid size={{ xs: 12 }}>
          <Typography>No articles available</Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default ArticleList;
