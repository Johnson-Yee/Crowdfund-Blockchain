import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import AppRoutes from './Routers/AppRoutes';
import { ThemeProvider } from '@mui/system';
import Theme from './Themes/Theme';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './reducer/store';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <BrowserRouter>
          <div className="App">
            <Header />
            <AppRoutes />
            <Footer />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
