import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { map } from 'lodash';
import { statusCheck } from '../../../Utils/dateParser';
import { getCampaignByIndexABI } from '../../../Contract/contract';

export const getCampaignById = createAsyncThunk(
  'ProjectDetails/getCampaignById',
  async (arg, { rejectWithValue }) => {
    try {
      return await getCampaignByIndexABI(arg);
    } catch (err) {
      return rejectWithValue('CampaignsById pull error');
    }
  }
);

const initialState = {
  campaign: [],
  loading: { allCampaigns: true },
  error: { allCampaigns: false },
  isDonationDisable: true,
  donationAmount: 0
};

const parseCampaigns = (c) => {
  return {
    status: 'ongoing',
    creator: c.creator,
    title: c.title,
    desc: c.description,
    imageURL: c.img_url,
    currAmt: c.currentAmount,
    goal: c.goal,
    minCon: c.minContribution,
    tier1Amt: c.tier1Amt,
    startTime: c.startTime,
    deadline: c.endTime,
    claimed: c.claimed
  };
};

const ProjectDetailsSlice = createSlice({
  name: 'projectDetails',
  initialState,
  reducers: {
    setDonationAmount(state, { payload }) {
      state.donationAmount = payload;
    }
  },
  extraReducers: {
    [getCampaignById.pending](state) {
      state.loading.allCampaigns = true;
      state.error.allCampaigns = false;
    },
    [getCampaignById.fulfilled](state, action) {
      state.loading.allCampaigns = false;
      state.error.allCampaigns = false;
      state.campaign = action.payload;
    },
    [getCampaignById.rejected](state, action) {
      state.loading.allCampaigns = false;
      state.error.allCampaigns = true;
    }
  }
});

export default ProjectDetailsSlice.reducer;
