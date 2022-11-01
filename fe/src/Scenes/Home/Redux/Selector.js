import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const homeSelector = (state) => state.home;

export const allCampaignsSelector = createSelector(homeSelector, (state) => state.allCampaigns);
