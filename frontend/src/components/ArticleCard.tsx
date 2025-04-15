import { Article } from '../types/Article';
import { Card, CardContent, Typography, Box, Chip, IconButton } from '@mui/material';
import { useDeleteArticle } from '../hooks/articleHooks';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface Props {
  article: Article;
}
const ArticleCard = ({ article }: Props) => {
  const { mutate: deleteArticle } = useDeleteArticle();
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
        <Box display="flex" gap={1} mb={2}>
          <IconButton size="small" component={Link} to={`/edit/${article.id}`}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this article?')) deleteArticle(article.id);
            }}
            aria-label="Delete"
            color="error"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
