import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a237e', // Main primary color
      contrastText: '#ffffff', // Text color on primary background
    },
    secondary: {
      main: '#c2185b', // Main secondary color
      contrastText: '#ffffff', // Text color on secondary background
    },
    background: {
      default: '#f5f5f5', // Default background color
    },
    text: {
      primary: '#333333', // Main text color
      secondary: '#757575', // Secondary text color
    },
    error: {
      main: '#ff3d00', // Error color
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    caption: {
      fontSize: '0.8rem',
      color: '#757575',
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none', // Disable uppercase for buttons
      },
    },
  },
});

export default theme;
