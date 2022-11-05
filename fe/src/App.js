import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import AppRoutes from './Routers/AppRoutes';
import { ThemeProvider } from '@mui/system';
import Theme from './Themes/Theme';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Snackbar } from '@mui/material';
import {
  closeNotification,
  notificationMessageSelector,
  notificationOpenSelector,
  notificationSuccessSelector
} from './AppSlice';

function App() {
  const dispatch = useDispatch();
  // Selectors
  const notificationMessage = useSelector(notificationMessageSelector);
  const notificationSuccess = useSelector(notificationSuccessSelector);
  const notificationOpen = useSelector(notificationOpenSelector);

  const handleClose = () => {
    dispatch(closeNotification());
  };

  const renderNotification = () => {
    const severity = notificationSuccess ? 'success' : 'error';
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={notificationOpen}
        autoHideDuration={3000}
        onClose={handleClose}>
        <Alert severity={severity} sx={{ width: '100%' }}>
          {notificationMessage}
        </Alert>
      </Snackbar>
    );
  };

  return (
    <ThemeProvider theme={Theme}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <AppRoutes />
          <Footer />
          {renderNotification()}
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
