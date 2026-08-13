import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import HealthDashboard from './components/HealthDashboard';

const theme = createTheme({
  palette: {
    primary: {
      main: '#d5d9e8',
    },
    secondary: {
      main: '#48ead7',
    },
    background: {
      default: '#d83232',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HealthDashboard />
    </ThemeProvider>
  );
}

export default App;
