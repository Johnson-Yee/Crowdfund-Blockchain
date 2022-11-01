import { combineReducers, configureStore } from '@reduxjs/toolkit';
import homeReducer from '../Scenes/Home/Redux/HomeSlice';

const reducer = combineReducers({ home: homeReducer });

export default configureStore({
  reducer
});
