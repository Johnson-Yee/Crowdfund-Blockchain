import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import AppRoutes from './Routers/AppRoutes';
import { ThemeProvider } from '@mui/system';
import Theme from './Themes/Theme';

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <div className="App">
        <Header />
        <AppRoutes />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
