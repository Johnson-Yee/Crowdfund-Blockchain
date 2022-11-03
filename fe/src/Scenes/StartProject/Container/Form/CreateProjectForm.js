import {
  Alert,
  AlertTitle,
  Backdrop,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCampaignABI } from '../../../../Contract/contract';
import { campaignInfoSelector, StartCampaignSelector } from '../../Redux/Selector';
import {
  createCampaign,
  setDesc,
  setEndDate,
  setGoal,
  setImageURL,
  setMinCon,
  setStartDate,
  setTitle
} from '../../Redux/StartCampaignSlice';

const CreateProjectForm = () => {
  const dispatch = useDispatch();

  // selectors
  const projectInfo = useSelector(campaignInfoSelector);
  const { loading, error } = useSelector(StartCampaignSelector);
  const { desc, endDate, goal, imageURL, minCon, startDate, title } = projectInfo;
  const { account } = useWeb3React();

  // Input validators
  const isGoalValid = Number.isInteger(goal);
  const isMinConValid = Number.isInteger(minCon) && minCon < goal;
  const isEndDateValid = endDate && endDate > startDate;
  const isStartDateValid = () => {
    var today = new Date().setHours(0, 0, 0, 0) / 1000;
    return startDate && today <= startDate;
  };
  const isSubmitValid = () => {
    console.log({
      goal: isGoalValid,
      minCon: isMinConValid,
      isEndDateValid: isEndDateValid,
      isStartDateValid: isStartDateValid()
    });
    return (
      imageURL &&
      title &&
      desc &&
      isGoalValid &&
      isMinConValid &&
      isEndDateValid &&
      isStartDateValid() &&
      account &&
      !loading
    );
  };

  // Event Handlers
  const imgURLChangeHandler = (input) => {
    const { value } = input.target;
    dispatch(setImageURL(value));
  };
  const titleChangeHandler = (input) => {
    const { value } = input.target;
    dispatch(setTitle(value));
  };
  const descChangeHandler = (input) => {
    const { value } = input.target;
    dispatch(setDesc(value));
  };
  const goalChangeHandler = (input) => {
    const { value } = input.target;
    dispatch(setGoal(Number(value)));
  };
  const minConChangeHandler = (input) => {
    const { value } = input.target;
    dispatch(setMinCon(Number(value)));
  };
  const startChangeHandler = (input) => {
    const { value } = input.target;
    const startDateInt = new Date(value).setHours(0, 0, 0, 0) / 1000;
    dispatch(setStartDate(startDateInt));
  };
  const endChangeHandler = (input) => {
    const { value } = input.target;
    const endDateInt = new Date(value).setHours(23, 59, 0, 0) / 1000;
    dispatch(setEndDate(endDateInt));
  };

  const onSubmitClick = () => {
    dispatch(createCampaign());
  };

  return (
    <>
      <Grid
        container
        direction="column"
        // justifyContent="center"
        // alignItems="center"
        rowSpacing={2}
        width="100%">
        <Grid container item>
          <Typography variant="h2">Project Image URL</Typography>
          <TextField
            fullWidth
            id="img-URL"
            required
            placeholder="URL"
            onChange={imgURLChangeHandler}
          />
        </Grid>
        <Grid container item>
          <Typography variant="h2">Project Title</Typography>
          <TextField
            fullWidth
            id="title"
            required
            placeholder="Enter Title"
            onChange={titleChangeHandler}
          />
        </Grid>
        <Grid container item>
          <Typography variant="h2">Project Description</Typography>
          <TextField
            fullWidth
            id="desc"
            multiline
            rows={4}
            placeholder="Enter Description"
            onChange={descChangeHandler}
          />
        </Grid>
        <Grid container item>
          <Typography variant="h2">Amount Required (wei)</Typography>
          <TextField
            fullWidth
            id="amt-required"
            required
            placeholder="Goal amount (wei)"
            type="number"
            onChange={goalChangeHandler}
          />
        </Grid>
        <Grid container item>
          <Typography variant="h2">Minimum donation (wei)</Typography>
          <TextField
            fullWidth
            id="min-donation"
            required
            placeholder="Goal amount (wei)"
            type="number"
            onChange={minConChangeHandler}
          />
        </Grid>

        <Grid container item spacing={2}>
          <Grid item container xs={6}>
            <Typography variant="h2">Start Date</Typography>
            <TextField
              fullWidth
              id="start-date"
              required
              type="date"
              onChange={startChangeHandler}
            />
          </Grid>
          <Grid item container xs={6}>
            <Typography variant="h2">End Date</Typography>
            <TextField fullWidth id="end-date" required type="date" onChange={endChangeHandler} />
          </Grid>
        </Grid>

        <Grid container item>
          <Button
            disabled={!isSubmitValid()}
            fullWidth
            variant="contained"
            color="primary"
            onClick={onSubmitClick}>
            Submit
          </Button>
        </Grid>
      </Grid>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default CreateProjectForm;
