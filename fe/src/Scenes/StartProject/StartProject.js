import { Container, Grid, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import ProjectCard from '../../Components/ProjectCard/ProjectCard';
import CreateProjectForm from './Container/Form/CreateProjectForm';

const StartProject = () => {
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
      <Container sx={{ marginBottom: 4 }}>
        <Typography variant="h1">Start a project</Typography>
      </Container>
      <Grid container spacing={3}>
        <Grid container item sm={3}>
          <ProjectCard
            {...{
              imageURL:
                'https://play-lh.googleusercontent.com/UrY7BAZ-XfXGpfkeWg0zCCeo-7ras4DCoRalC_WXXWTK9q5b0Iw7B0YQMsVxZaNB7DM',
              title: 'Spotify',
              desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
              creator: 'Ethan',
              percFunded: 50,
              amtPledged: 500,
              deadline: 20
            }}
          />
        </Grid>
        <Grid container item sm={9}>
          <CreateProjectForm />
        </Grid>
      </Grid>
    </>
  );
};

export default StartProject;
