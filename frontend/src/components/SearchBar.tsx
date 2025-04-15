import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSearch}
      sx={{
        display: 'flex',
        gap: 2,
        width: '100%',
        maxWidth: 800,
        margin: '0 auto',
        padding: 2,
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search articles by keyword or tag..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        InputProps={{
          startAdornment: <SearchIcon color="action" />,
        }}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ minWidth: 100 }}>
        Search
      </Button>
    </Box>
  );
};
