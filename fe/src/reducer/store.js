import { combineReducers, configureStore } from '@reduxjs/toolkit';
import homeReducer from '../Scenes/Home/Redux/HomeSlice';
import StartCampaign from '../Scenes/StartProject/Redux/StartCampaignSlice';
import projectDetailsReducer from '../Scenes/ProjectDetails/Redux/ProjectDetailsSlice';
import appReducer from '../AppSlice';

const reducer = combineReducers({
  app: appReducer,
  home: homeReducer,
  startCampaign: StartCampaign,
  projectDetails: projectDetailsReducer
});

export default configureStore({
  reducer
});
