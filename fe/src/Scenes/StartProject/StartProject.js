import { Container, Grid, Typography } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProjectCard from '../../Components/ProjectCard/ProjectCard';
import CreateProjectForm from './Container/Form/CreateProjectForm';
import { campaignInfoSelector } from './Redux/Selector';

const StartProject = () => {
  const projectInfo = useSelector(campaignInfoSelector);
  const { desc, endDate, goal, imageURL, minCon, startDate, title } = projectInfo;
  const { account } = useWeb3React();

  // useEffect(() => {
  //   console.log(projectInfo);
  // }, [projectInfo]);

  const isInputValid = () => {
    // return isTitleValid && isDescValid && isAmtValid;
    return true;
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
              imageURL: imageURL,

              title: isEmpty(title) ? 'Title' : title,
              desc: isEmpty(desc) ? 'Description' : desc,
              creator: isEmpty(account) ? 'Creator' : account,
              percFunded: 0,
              amtPledged: 0,
              deadline: 20,
              clickable: false
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
