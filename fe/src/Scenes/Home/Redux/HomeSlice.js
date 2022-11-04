import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { backedCampaignABI, getAllCampaignsABI } from '../../../Contract/contract';
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

export const getBackedCampaignIds = createAsyncThunk(
  'Home/getBackedCampaignIds',
  async (arg, { rejectWithValue }) => {
    try {
      return await backedCampaignABI();
    } catch (err) {
      return rejectWithValue('Backed Ids pull error');
    }
  }
);

const parseCampaigns = (campaigns) => {
  return map(campaigns, (c, index) => {
    return {
      id: index,
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
  userAddress: '',
  backedCampaignIds: [],
  loading: { allCampaigns: true, backedCampaignIds: true },
  error: { allCampaigns: false, backedCampaignIds: false },
  allCampaigns: [],
  campaignCount: 0
};

const HomeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setUserAddress(state, { payload }) {
      state.userAddress = payload;
    }
  },
  extraReducers: {
    [getCampaigns.pending](state) {
      state.loading.allCampaigns = true;
      state.error.allCampaigns = false;
    },
    [getCampaigns.fulfilled](state, action) {
      state.loading.allCampaigns = false;
      state.error.allCampaigns = false;
      state.allCampaigns = parseCampaigns(action.payload);
    },
    [getCampaigns.rejected](state, action) {
      state.loading.allCampaigns = false;
      state.error.allCampaigns = true;
    },
    [getBackedCampaignIds.pending](state) {
      state.loading.backedCampaignIds = true;
      state.error.backedCampaignIds = false;
    },
    [getBackedCampaignIds.fulfilled](state, action) {
      state.loading.backedCampaignIds = false;
      state.error.backedCampaignIds = false;
      state.backedCampaignIds = action.payload;
    },
    [getBackedCampaignIds.rejected](state, action) {
      state.loading.backedCampaignIds = false;
      state.error.backedCampaignIds = true;
    }
  }
});
export const { setUserAddress } = HomeSlice.actions;

export default HomeSlice.reducer;
