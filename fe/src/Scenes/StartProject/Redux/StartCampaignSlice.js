import { createAsyncThunk, createSlice, isFulfilled } from '@reduxjs/toolkit';
import { map } from 'lodash';
import { startCampaignABI } from '../../../Contract/contract';
import { setNotification } from '../../../AppSlice';
export const createCampaign = createAsyncThunk(
  'StartCampaign/createCampaigns',
  async (arg, { getState, rejectWithValue, dispatch }) => {
    try {
      const state = getState();
      const { title, desc, imageURL, goal, minCon, startDate, endDate } =
        state.startCampaign.campaignInfo;
      const res = await startCampaignABI(
        title,
        desc,
        imageURL,
        goal,
        minCon,
        0,
        startDate,
        endDate
      );
      dispatch(clearFields());
      dispatch(setNotification({ isSuccess: true, message: 'Campaign Created!' }));
      return res;
    } catch (err) {
      dispatch(setNotification({ isSuccess: false, message: 'Error in Creation!' }));
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

const initialState = {
  loading: false,
  error: false,
  campaignInfo: {
    imageURL: '',
    title: '',
    desc: '',
    goal: null,
    minCon: null,
    startDate: null,
    endDate: null
  }
};

const StartCampaignSlice = createSlice({
  name: 'StartProject',
  initialState,
  reducers: {
    setImageURL(state, { payload }) {
      state.campaignInfo.imageURL = payload;
    },
    setTitle(state, { payload }) {
      state.campaignInfo.title = payload;
    },
    setDesc(state, { payload }) {
      state.campaignInfo.desc = payload;
    },
    setGoal(state, { payload }) {
      state.campaignInfo.goal = payload;
    },
    setMinCon(state, { payload }) {
      state.campaignInfo.minCon = payload;
    },
    setStartDate(state, { payload }) {
      state.campaignInfo.startDate = payload;
    },
    setEndDate(state, { payload }) {
      state.campaignInfo.endDate = payload;
    },
    clearFields(state) {
      state.campaignInfo = initialState;
    }
  },
  extraReducers: {
    [createCampaign.fulfilled](state, action) {
      state.loading = false;
      state.error = false;
    },
    [createCampaign.pending](state, action) {
      state.loading = true;
      state.error = false;
    },
    [createCampaign.rejected](state, action) {
      const { payload } = action;
      state.loading = false;
      state.errore = true;
    }
  }
});

export const {
  setImageURL,
  setTitle,
  setDesc,
  setGoal,
  setMinCon,
  setStartDate,
  setEndDate,
  clearFields
} = StartCampaignSlice.actions;

export default StartCampaignSlice.reducer;
