import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

export const StartCampaignSelector = (state) => {
  return state.startCampaign;
};

export const campaignInfoSelector = createSelector(
  StartCampaignSelector,
  (state) => state.campaignInfo
);
