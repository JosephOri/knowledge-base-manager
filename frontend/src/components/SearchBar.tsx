import { useState } from 'react';
import { Box, TextField, Button, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    setQuery('');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSearch}
      sx={{
        display: 'flex',
        gap: 1,
        alignItems: 'center',
        width: '100%',
        maxWidth: 600,
        mx: 'auto',
        p: 1,
        flexDirection: { xs: 'column', sm: 'row' },
      }}
    >
      <TextField
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search articles by title, content, or tags..."
        variant="outlined"
        size="small"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            backgroundColor: 'background.paper',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)',
            },
            '&.Mui-focused': {
              boxShadow: '0 0 12px rgba(0, 0, 0, 0.15)',
            },
          },
        }}
        aria-label="Search articles"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          borderRadius: '8px',
          textTransform: 'none',
          px: 3,
          py: 0.8,
          height: '40px',
          width: { xs: '100%', sm: 'auto' },
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        Search
      </Button>
    </Box>
  );
};
