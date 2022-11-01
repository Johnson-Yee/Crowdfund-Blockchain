import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllCampaignsABI } from '../../../Contract/contract';
import { map } from 'lodash';
export const getCampaigns = createAsyncThunk('Home/getCampaigns', async () => {
  return await getAllCampaignsABI();
});

const parseCampaigns = (campaigns) => {
  return map(campaigns, (c) => {
    return {
      creator: c[0],
      minCon: c[1],
      amtPledged: c[2],
      goal: c[3],
      start: c[4],
      deadline: c[5],
      tier1Amt: c[6],
      claimed: c[7]
    };
  });
};
const initialState = {
  loading: true,
  error: false,
  allCampaigns: [],
  campaignCount: 0
};

const HomeSlice = createSlice({
  name: 'home',
  initialState,
  extraReducers: {
    [getCampaigns.pending](state) {
      state.loading = true;
      state.error = false;
    },
    [getCampaigns.fulfilled](state, action) {
      state.loading = false;
      state.error = false;
      state.allCampaigns = parseCampaigns(action.payload);
    },
    [getCampaigns.rejected](state, action) {
      state.loading = false;
      state.error = true;
    }
  }
});

export default HomeSlice.reducer;
