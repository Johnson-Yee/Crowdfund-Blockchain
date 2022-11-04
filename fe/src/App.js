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
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

function App() {
  function getLibrary(provider) {
    return new Web3Provider(provider);
  }

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
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
    </Web3ReactProvider>
  );
}

export default App;
