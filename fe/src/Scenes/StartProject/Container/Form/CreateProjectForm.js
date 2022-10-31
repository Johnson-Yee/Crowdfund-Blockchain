import { Button, Grid, TextField, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';

const CreateProjectForm = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [amt, setAmt] = useState(0);
  const [deadline, setDeadline] = useState(0);

  const isTitleValid = () => {
    return !isEmpty(title);
  };
  const isDescValid = () => {
    return !isEmpty(desc);
  };
  const isAmtValid = () => {
    return amt % 1 == 0 && amt > 100;
  };

  const isInputValid = () => {
    return isTitleValid && isDescValid && isAmtValid;
  };

  return (
    <>
      <Grid
        container
        direction="column"
        // justifyContent="center"
        // alignItems="center"
        rowSpacing={2}
        width="100%">
        <Grid container item>
          <Typography variant="h2">Project Image URL</Typography>
          <TextField fullWidth id="amt-required" required placeholder="URL" />
        </Grid>
        <Grid container item>
          <Typography variant="h2">Project Title</Typography>
          <TextField fullWidth id="title" required placeholder="Enter Title" />
        </Grid>
        {/* <Grid container item>
          <Typography variant="h2">Project Creator</Typography>
          <TextField fullWidth id="creator" required />
        </Grid> */}
        <Grid container item>
          <Typography variant="h2">Project Description</Typography>
          <TextField
            fullWidth
            id="desc"
            multiline
            rows={4}
            placeholder="Enter Description"
            onChange={(d) => console.log(d.target.value)}
          />
        </Grid>
        <Grid container item>
          <Typography variant="h2">Amount Required (wei)</Typography>
          <TextField fullWidth id="amt-required" required placeholder="Goal amount (wei)" />
        </Grid>
        <Grid container item>
          <Typography variant="h2">Minimum donation (wei)</Typography>
          <TextField fullWidth id="amt-required" required placeholder="Goal amount (wei)" />
        </Grid>

        <Grid container item spacing={2}>
          <Grid item container xs={6}>
            <Typography variant="h2">Start Date</Typography>
            <TextField
              fullWidth
              id="deadline"
              required
              type="date"
              onChange={(d) => console.log(d.target.value)}
            />
          </Grid>
          <Grid item container xs={6}>
            <Typography variant="h2">End Date</Typography>
            <TextField
              fullWidth
              id="deadline"
              required
              type="date"
              onChange={(d) => console.log(d.target.value)}
            />
          </Grid>
        </Grid>

        <Grid container item>
          <Button disabled={!isInputValid} fullWidth variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default CreateProjectForm;
