import { combineReducers, configureStore } from '@reduxjs/toolkit';
import homeReducer from '../Scenes/Home/Redux/HomeSlice';
import StartCampaign from '../Scenes/StartProject/Redux/StartCampaignSlice';
import projectDetailsReducer from '../Scenes/ProjectDetails/Redux/ProjectDetailsSlice';

const reducer = combineReducers({
  home: homeReducer,
  startCampaign: StartCampaign,
  projectDetails: projectDetailsReducer
});

export default configureStore({
  reducer
});
