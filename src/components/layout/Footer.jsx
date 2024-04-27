import React from 'react';
import { Box, Grid, Typography, IconButton } from '@mui/material';
import { Email, GitHub, Twitter } from '@mui/icons-material';

function Footer() {
  return (
    <Box bgcolor="#0000ff" color="#fff" py={3}>
      <Grid container justifyContent="center">
     
        <Grid item container justifyContent="center" spacing={2}>
      
        </Grid>
        <Grid item>
          <Typography variant="body2">&copy; 2024 Your Chat App</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Footer;
