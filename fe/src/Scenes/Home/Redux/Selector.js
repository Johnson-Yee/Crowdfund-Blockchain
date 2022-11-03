import { createSelector } from '@reduxjs/toolkit';
import { create } from 'lodash';
import { useSelector } from 'react-redux';

const homeSelector = (state) => state.home;
const campaignsSelector = (state) => state.home.allCampaigns;

export const allCampaignsSelector = createSelector(homeSelector, (state) => state.allCampaigns);

export const selectCampaigns = createSelector(campaignsSelector, (items) =>
  items.filter((item) => item.creator === '0xFd16D32219a1c50879B588AB9A33d8aF195E7701')
);
