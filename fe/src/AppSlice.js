import { createSelector, createSlice } from '@reduxjs/toolkit';

// Selector
export const appSelector = (state) => state.app;
export const notificationMessageSelector = createSelector(appSelector, (state) => state.message);
export const notificationSuccessSelector = createSelector(appSelector, (state) => state.isSuccess);
export const notificationOpenSelector = createSelector(
  appSelector,
  (state) => state.notificationOpen
);

const initialState = {
  isSuccess: true,
  message: '',
  notificationOpen: false
};

const AppSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setNotification(state, { payload }) {
      const { isSuccess, message } = payload;
      state.isSuccess = isSuccess;
      state.message = message;
      state.notificationOpen = true;
    },
    closeNotification(state) {
      state.notificationOpen = false;
    }
  }
});

export const { setNotification, closeNotification } = AppSlice.actions;

export default AppSlice.reducer;
