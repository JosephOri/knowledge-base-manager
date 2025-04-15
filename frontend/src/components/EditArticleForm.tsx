import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Stack } from '@mui/material';
import { useArticle, useUpdateArticle } from '../hooks/articleHooks';

export const EditArticleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: existingArticle } = useArticle(id || '');
  const updateMutation = useUpdateArticle();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (existingArticle) {
      setTitle(existingArticle.title);
      setContent(existingArticle.content);
      setTags(existingArticle.tags.join(', '));
    }
  }, [existingArticle]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setValidationError('Title and content are required');
      return;
    }

    try {
      await updateMutation.mutateAsync({
        id: id!,
        title,
        content,
        tags: tags.split(',').map((t) => t.trim()),
      });
      navigate('/');
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <Stack spacing={2}>
        <TextField
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          fullWidth
        />

        <TextField
          label="Content"
          variant="outlined"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          multiline
          rows={4}
          fullWidth
        />

        <TextField
          label="Tags (comma separated)"
          variant="outlined"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          fullWidth
        />

        {validationError && <Box color="error.main">{validationError}</Box>}

        {updateMutation.error && <Box color="error.main">Error: {updateMutation.error.message}</Box>}

        <Button type="submit" variant="contained" disabled={updateMutation.isPending} sx={{ alignSelf: 'flex-start' }}>
          {updateMutation.isPending ? 'Updating...' : 'Update Article'}
        </Button>
      </Stack>
    </Box>
  );
};
