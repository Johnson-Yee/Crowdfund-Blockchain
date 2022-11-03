import { combineReducers, configureStore } from '@reduxjs/toolkit';
import homeReducer from '../Scenes/Home/Redux/HomeSlice';
import StartCampaign from '../Scenes/StartProject/Redux/StartCampaignSlice';

const reducer = combineReducers({ home: homeReducer, startCampaign: StartCampaign });

export default configureStore({
  reducer
});
