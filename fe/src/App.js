import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import AppRoutes from './Routers/AppRoutes';
import { ThemeProvider } from '@mui/system';
import Theme from './Themes/Theme';
import { Provider } from 'react-redux';
import store from './reducer/store';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <div className="App">
          <Header />
          <AppRoutes />
          <Footer />
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
