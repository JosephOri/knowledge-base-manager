import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Stack } from '@mui/material';
import { useArticle, useCreateArticle, useUpdateArticle } from '../hooks/articleHooks';

export const ArticleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: existingArticle } = useArticle(id || '');
  const createMutation = useCreateArticle();
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
      if (id) {
        await updateMutation.mutateAsync({
          id,
          title,
          content,
          tags: tags.split(',').map((t) => t.trim()),
        });
      } else {
        await createMutation.mutateAsync({
          title,
          content,
          tags: tags.split(',').map((t) => t.trim()),
        });
      }
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

        {(createMutation.error || updateMutation.error) && (
          <Box color="error.main">Error: {(createMutation.error || updateMutation.error)?.message}</Box>
        )}

        <Button
          type="submit"
          variant="contained"
          disabled={createMutation.isPending || updateMutation.isPending}
          sx={{ alignSelf: 'flex-start' }}
        >
          {id
            ? updateMutation.isPending
              ? 'Updating...'
              : 'Update Article'
            : createMutation.isPending
            ? 'Creating...'
            : 'Create Article'}
        </Button>
      </Stack>
    </Box>
  );
};
