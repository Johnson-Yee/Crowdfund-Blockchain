import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import Web3 from 'web3';
import { getUserAddress } from '../../../Contract/contract';
import { reduce, map, create } from 'lodash';

const campaignSelector = (state) => state.projectDetails;

export const getCampaignByIdSelector = createSelector(campaignSelector, (state) => state.campaign);

export const getLoadingState = createSelector(
  campaignSelector,
  (state) => state.loading.allCampaigns
);

export const getisDonationDisable = createSelector(
  campaignSelector,
  (state) => state.isDonationDisable
);

export const getdonationAmount = createSelector(campaignSelector, (state) => state.donationAmount);
