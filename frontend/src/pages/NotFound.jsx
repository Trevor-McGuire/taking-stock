import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Typography, Container, CssBaseline, Paper, Grid, Stack } from '@mui/material';

function NotFound() {
  let location = useLocation();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3} className="card-rounded">
        <Grid container justifyContent="center" alignItems="center" style={{ height: '250px' }}>
          <Grid item xs={12}>
              <Stack sx={{ width: '100%' }} spacing={2}>
              <Typography variant="h3" color="textPrimary" align='center'>
                404 - Not Found
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" align='center'>
                No match for <code>{location.pathname}</code>
              </Typography>
              <Typography variant="button" color="textSecondary" align='center' component={Link} to="/">
                Return Home
              </Typography>
              </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default NotFound;
