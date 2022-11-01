import React from 'react';
import { Container } from '@mui/system';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home, MyProject, ProjectDetails, StartProject } from '../Scenes/index';

const AppRoutes = () => {
  return (
    <Container sx={{ flex: 1 }}>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/ProjectDetails/:id" element={<ProjectDetails />} />
        <Route path="/MyProject" element={<MyProject />} />
        <Route path="*" element={<Navigate replace to="/Home" />} />
        {/* force rerouting to homepage */}
      </Routes>
    </Container>
  );
};
export default AppRoutes;
