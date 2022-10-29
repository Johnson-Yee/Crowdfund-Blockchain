import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import React from 'react';

const StartProject = () => {
  return (
    <>
      <Container sx={{ marginBottom: 4 }}>
        <Typography variant="h1">Start a project</Typography>
      </Container>

      <Grid
        container
        direction="column"
        // justifyContent="center"
        // alignItems="center"
        rowSpacing={4}
        width="50%"
        mx="auto">
        <Grid container item>
          <Typography variant="h2">Project Title</Typography>
          <TextField fullWidth id="title" required />
        </Grid>
        <Grid container item>
          <Typography variant="h2">Project Creator</Typography>
          <TextField fullWidth id="creator" required />
        </Grid>
        <Grid container item>
          <Typography variant="h2">Project Description</Typography>
          <TextField fullWidth id="desc" multiline rows={4} />
        </Grid>
        <Grid container item>
          <Typography variant="h2">Amount Required</Typography>
          <TextField fullWidth id="amt-required" required />
        </Grid>
        <Grid container item>
          <Typography variant="h2">Deadline</Typography>
          <TextField fullWidth id="deadline" required type="date" />
        </Grid>
        <Grid container item>
          <Button fullWidth variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default StartProject;
