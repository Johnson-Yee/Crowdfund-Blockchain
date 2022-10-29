import React from 'react';
import { Container } from '@mui/system';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Home, MyProject, ProjectDetails, StartProject } from '../Scenes/index';

const AppRoutes = () => {
  return (
    <Container sx={{ flex: 1 }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ProjectDetails/*" element={<ProjectDetails />} />
          <Route path="/MyProject/*" element={<MyProject />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
};
export default AppRoutes;
