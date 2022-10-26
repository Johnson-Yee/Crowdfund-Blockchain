import { Grid } from '@mui/material';
import React from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';

const ProjectCardGrid = ({ projectList }) => {
  const projectToCard = (project) => {
    return (
      <Grid item sm={4} xs={12}>
        <ProjectCard {...project} />
      </Grid>
    );
  };
  return (
    <>
      <Grid container spacing={4}>
        {projectList.map((project) => {
          return projectToCard(project);
        })}
      </Grid>
    </>
  );
};
export default ProjectCardGrid;
