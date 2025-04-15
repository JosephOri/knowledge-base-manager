import { Article } from '../types/Article';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';

interface Props {
  article: Article;
}
const ArticleCard = ({ article }: Props) => {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box display="grid" alignItems="center" mb={2}>
          <Typography variant="h6">{article.title || 'No title'}</Typography>
        </Box>
        <Typography variant="body2" color="textSecondary" mb={2}>
          {article.content || 'No content'}
        </Typography>
        <Box display="flex" flexWrap="wrap" mb={2}>
          {article.tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" sx={{ mr: 1, mb: 1 }} />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
