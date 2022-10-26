import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import ProjectCardGrid from './Components/ProjectCardGrid/ProjectCardGrid';
import { Container } from '@mui/system';
import { MOCK_PROJ_LIST } from './Constants/Mocks/MockProjList';
import AppRoutes from './Routers/AppRoutes';

function App() {
  return (
    <div className="App">
      <Header />
      {/* <Container sx={{ mx: '100' }}>
        <ProjectCardGrid projectList={MOCK_PROJ_LIST} />
      </Container> */}
      <AppRoutes />
      <Footer />
    </div>
  );
}

export default App;
