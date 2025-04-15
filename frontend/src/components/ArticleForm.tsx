import { useState } from 'react';
import { Box, Button, TextField, Stack } from '@mui/material';

type ArticleFormProps = {
  onSubmit: (article: { title: string; content: string; tags: string[] }) => Promise<void>;
  isPending: boolean;
  error?: Error;
};

export const ArticleForm = ({ onSubmit, isPending, error }: ArticleFormProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setValidationError('Title and content are required');
      return;
    }

    await onSubmit({
      title,
      content,
      tags: tags.split(',').map((t) => t.trim()),
    });
    setTitle('');
    setContent('');
    setTags('');
    setValidationError('');
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

        {error && <Box color="error.main">Error creating article: {error.message}</Box>}

        <Button type="submit" variant="contained" disabled={isPending} sx={{ alignSelf: 'flex-start' }}>
          {isPending ? 'Submitting...' : 'Create Article'}
        </Button>
      </Stack>
    </Box>
  );
};
