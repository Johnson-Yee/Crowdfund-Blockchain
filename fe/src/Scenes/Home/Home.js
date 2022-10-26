import React from 'react';
import ProjectCardGrid from '../../Components/ProjectCardGrid/ProjectCardGrid';
import { MOCK_PROJ_LIST } from '../../Constants/Mocks/MockProjList';

const Home = () => {
  return <ProjectCardGrid projectList={MOCK_PROJ_LIST} />;
};

export default Home;
