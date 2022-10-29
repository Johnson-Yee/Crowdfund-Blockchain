import React from 'react';
import { Container } from '@mui/system';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { Home, MyProject, ProjectDetails, StartProject } from '../Scenes/index';

const AppRoutes = () => {
  return (
    <Container sx={{ flex: 1 }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ProjectDetails/:id" element={<ProjectDetails />} />
          <Route path="/MyProject/*" element={<MyProject />} />
          <Route path="*" element={<Navigate replace to="/" />} />
          {/* force rerouting to homepage */}
        </Routes>
      </BrowserRouter>
    </Container>
  );
};
export default AppRoutes;
