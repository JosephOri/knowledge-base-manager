import { Alert, Box, Button } from '@mui/material';

const ErrorDisplay = ({ error }: { error: Error }) => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
      <Alert severity="error" style={{ marginBottom: 16 }}>
        Error loading articles: {error.message}
      </Alert>
      <Button variant="contained" color="primary" onClick={() => window.location.reload()}>
        Retry
      </Button>
    </Box>
  );
};

export default ErrorDisplay;
