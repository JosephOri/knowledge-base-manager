import { useState } from 'react';
import { Box, Button, TextField, Stack } from '@mui/material';
import { useCreateArticle } from '../hooks/articleHooks';
import { useNavigate } from 'react-router-dom';

const ArticleForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const createMutation = useCreateArticle();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [validationError, setValidationError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setValidationError('Title and content are required');
      return;
    }

    try {
      await createMutation.mutateAsync({
        title,
        content,
        tags: tags.split(',').map((t) => t.trim()),
      });
      setTitle('');
      setContent('');
      setTags('');
      setValidationError('');
      onSuccess?.();
      alert('Article created successfully!');
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

        {createMutation.error && <Box color="error.main">Error: {createMutation.error.message}</Box>}

        <Button type="submit" variant="contained" disabled={createMutation.isPending} sx={{ alignSelf: 'flex-start' }}>
          {createMutation.isPending ? 'Creating...' : 'Create Article'}
        </Button>
      </Stack>
    </Box>
  );
};

export default ArticleForm;
