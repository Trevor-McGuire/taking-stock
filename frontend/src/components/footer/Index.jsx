import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import WebsocketData from './WebsocketData';

const Index = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        padding: 3,
        mt: 'auto',
      }}
    >
      <Container maxWidth="md">
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} Taking Stock. All rights reserved.
        </Typography>
        <WebsocketData />
      </Container>
    </Box>
  );
};

export default Index;