import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import AppRoutes from './Routers/AppRoutes';
import { ThemeProvider } from '@mui/system';
import Theme from './Themes/Theme';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <AppRoutes />
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
