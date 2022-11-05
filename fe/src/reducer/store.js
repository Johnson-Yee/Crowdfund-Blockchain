import { combineReducers, configureStore } from '@reduxjs/toolkit';
import homeReducer from '../Scenes/Home/Redux/HomeSlice';
import StartCampaign from '../Scenes/StartProject/Redux/StartCampaignSlice';
import appReducer from '../AppSlice';

const reducer = combineReducers({
  app: appReducer,
  home: homeReducer,
  startCampaign: StartCampaign
});

export default configureStore({
  reducer
});
