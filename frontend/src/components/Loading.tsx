import { Box, CircularProgress, Typography } from '@mui/material';

const Loading = () => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
      <Typography variant="h6" style={{ marginTop: 16 }}>
        Loading articles...
      </Typography>
    </Box>
  );
};

export default Loading;
