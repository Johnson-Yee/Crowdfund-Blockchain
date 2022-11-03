import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllCampaignsABI } from '../../../Contract/contract';
import { map } from 'lodash';
export const getCampaigns = createAsyncThunk(
  'Home/getCampaigns',
  async (arg, { rejectWithValue }) => {
    try {
      return await getAllCampaignsABI();
    } catch (err) {
      return rejectWithValue('Campaigns pull error');
    }
  }
);

const parseCampaigns = (campaigns) => {
  return map(campaigns, (c) => {
    return {
      creator: c[0],
      title: c[1],
      desc: c[2],
      imageURL: c[3],
      currAmt: c[4],
      goal: c[5],
      minCon: c[6],
      tier1Amt: c[7],
      startTime: c[8],
      deadline: c[9],
      claimed: c[10]
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
