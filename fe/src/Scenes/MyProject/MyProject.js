import { Container, Typography } from '@mui/material';
import React from 'react';
import ProjectCardGrid from '../../Components/ProjectCardGrid/ProjectCardGrid';
import { MOCK_PROJ_LIST } from '../../Constants/Mocks/MockProjList';

const MyProject = () => {
  return (
    <>
      <Container sx={{ marginBottom: 4 }}>
        <Typography variant="h1">My projects</Typography>
      </Container>
      <ProjectCardGrid projectList={MOCK_PROJ_LIST} />
    </>
  );
};
export default MyProject;
