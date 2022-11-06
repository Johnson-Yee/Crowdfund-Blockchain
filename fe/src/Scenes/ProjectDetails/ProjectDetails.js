import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  LinearProgress,
  Typography,
  Box,
  Stack,
  Grid,
  Button,
  CircularProgress,
  TextField,
  Backdrop
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { MOCK_PROJ_LIST } from '../../Constants/Mocks/MockProjList';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../../Wallet/Connector';
import { useDispatch, useSelector } from 'react-redux';
import { getCampaignById } from './Redux/ProjectDetailsSlice';
import { getCampaignByIdSelector, getLoadingState } from './Redux/Selector';
import {
  checkDonatedAmount,
  checkDonatedAmountABI,
  makeDonation,
  withdrawDonatedAmountABI
} from '../../Contract/contract';
import { set } from 'lodash';
import { setNotification } from '../../AppSlice';

const ProjectDetails = () => {
  const dispatch = useDispatch();
  const selectedCampaign = useSelector(getCampaignByIdSelector);
  const isLoading = useSelector(getLoadingState);
  let { id } = useParams();
  const [isDonationDisable, setIsDonationDisable] = useState(false);
  const [donationAmount, setDonationAmount] = useState(0);
  const [donatedAmount, setDonatedAmount] = useState(0);
  const [reimburseAllow, setReimburseAllow] = useState(false);
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const { active, account, activate } = useWeb3React();

  useEffect(() => {
    dispatch(getCampaignById(id));
    setSubmissionLoading(false);
  }, []);

  useEffect(() => {
    const currentAmount = parseInt(selectedCampaign.currentAmount);
    const goalAmount = parseInt(selectedCampaign.goal);
    if (currentAmount > goalAmount) {
      setReimburseAllow(true);
    }
  }, [selectedCampaign]);

  // check whether user have donated to the project
  useEffect(() => {
    const getDonatedAmount = async () => {
      const donatedAmount = await checkDonatedAmountABI(id);
      console.log(donatedAmount);
      setDonatedAmount(parseInt(donatedAmount));
    };
    getDonatedAmount();
  }, [selectedCampaign, id]);

  const checkState = () => {
    console.log(account);
    console.log(active);
    console.log(donatedAmount);
    console.log(reimburseAllow);
  };

  async function connect() {
    try {
      await activate(injected);
      console.log('login>>>>>>>>>>>>>', account);
    } catch (ex) {
      console.log(ex);
    }
  }

  // if user not logged in, prompt to log in
  const NonLoggedUserInteraction = () => {
    return (
      <Button variant="contained" onClick={() => connect()}>
        Connect Wallet to back campaigns
      </Button>
    );
  };

  const onChangeHandler = (event) => {
    console.log('here');
    console.log(event.target.value);
    setDonationAmount(event.target.value);
  };

  const onSubmitHandler = async () => {
    try {
      setSubmissionLoading(true);
      var regex = /^[0-9.]+$/;
      if (!donationAmount.match(regex)) {
        alert('Must input number only');
        return false;
      }
      const response = await makeDonation(donationAmount, id);
      console.log(response);
      dispatch(getCampaignById(id));
      dispatch(setNotification({ isSuccess: true, message: 'Donation Successful!' }));
    } catch (error) {
      console.log(error);
      dispatch(setNotification({ isSuccess: false, message: 'Donation failed!' }));
    } finally {
      setSubmissionLoading(false);
      setDonatedAmount(0);
    }
  };

  const onWithdrawalHandler = async () => {
    try {
      setSubmissionLoading(true);
      const response = await withdrawDonatedAmountABI(id, donatedAmount);
      console.log(response);
      dispatch(getCampaignById(id));
      dispatch(setNotification({ isSuccess: true, message: 'Withdrawal Successful!' }));
    } catch (error) {
      console.log(error);
      dispatch(setNotification({ isSuccess: false, message: 'Donation failed!' }));
    } finally {
      setSubmissionLoading(false);
    }
  };

  const epochToJsSDate = (ts) => {
    const diff = ts * 1000 - Date.now();
    const hourDiff = Math.floor(diff / 3600000).toString();
    const dayDiff = Math.floor(diff / (3600000 * 24)).toString();
    if (dayDiff === '0') {
      return hourDiff + ' hours ';
    } else {
      return dayDiff + ' day(s) ';
    }
  };

  return (
    <>
      <Grid container spacing={0} direction="column" alignItems="center" justify="center">
        {isLoading && <CircularProgress />}
        {!isLoading && (
          <Card
            className="animate__animated animate__fadeIn"
            raised
            sx={{
              height: 'auto',
              width: '90%',
              display: 'flex',
              flexDirection: 'column',
              padding: 0,
              borderRadius: '15px',
              bgcolor: '#D9D9D9'
            }}>
            <Grid sx={{ height: '100%', flexGrow: 1 }}>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <CardMedia
                  item="true"
                  component="img"
                  src={selectedCampaign.img_url}
                  sx={{
                    height: '30vw',
                    width: '30vw',
                    objectFit: 'fit',
                    flexGrow: 1,
                    borderRadius: '15px 0px 0px 0px'
                  }}
                />
                <CardContent
                  sx={{
                    textAlign: 'left',
                    bgcolor: '#D9D9D9',
                    height: 'auto',
                    flexGrow: 2,
                    paddingTop: 0
                  }}>
                  <Stack spacing={1}>
                    <Typography variant="h6" noWrap height="auto" sx={{ paddingTop: 1 }}>
                      {selectedCampaign.title} (Campaign ID: {id})
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={selectedCampaign.currentAmount / selectedCampaign.goal > 100 && 100}
                    />
                    {!active && <NonLoggedUserInteraction />}
                    {/* owner interaction */}
                    {selectedCampaign.creator === account && active && (
                      <React.Fragment>
                        {reimburseAllow && (
                          <Typography variant="subtitle1" color="text.secondary" noWrap={true}>
                            Campaign has reached its goal.
                          </Typography>
                        )}
                        {reimburseAllow && (
                          <Button variant="contained">Withdraw Funds to Own Account</Button>
                        )}
                      </React.Fragment>
                    )}
                    {/* non owner interaction */}
                    {selectedCampaign.creator !== account && active && (
                      <React.Fragment>
                        {donatedAmount !== 0 && (
                          <Typography variant="subtitle1" color="text.secondary" noWrap={true}>
                            You have donated {donatedAmount} wei to this campaign.
                          </Typography>
                        )}
                        {donatedAmount === 0 && (
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              width: '100%',
                              justifyContent: 'space-evenly',
                              gap: '5px'
                            }}>
                            <TextField
                              label={
                                'Min Amount: ' +
                                selectedCampaign.minContribution / 1000000000000000000
                              }
                              value={donationAmount}
                              fullWidth
                              onChange={onChangeHandler}
                            />
                            <Button
                              type="button"
                              variant="contained"
                              disabled={isDonationDisable}
                              fullWidth
                              onClick={() => onSubmitHandler()}>
                              Back Project
                            </Button>
                          </div>
                        )}
                        {donatedAmount > 0 && (
                          <Button
                            disabled={donatedAmount === 0}
                            variant="contained"
                            onClick={() => onWithdrawalHandler()}>
                            Withdraw Donated Fund ({donatedAmount})
                          </Button>
                        )}
                      </React.Fragment>
                    )}
                    <Typography variant="subtitle1" color="text.secondary" noWrap={true}>
                      By: {selectedCampaign.creator}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {(selectedCampaign.currentAmount * 100) / selectedCampaign.goal}% funded
                      <br />
                      {selectedCampaign.currentAmount / 1000000000000000000} ETH pledged
                      <br />
                      Goal : {selectedCampaign.goal / 1000000000000000000} ETH
                      <br />
                      {epochToJsSDate(selectedCampaign.endTime)} to go
                    </Typography>
                  </Stack>
                </CardContent>
              </Box>
              <Grid sx={{ padding: 2, paddingTop: 1 }}>
                <Typography
                  gutterBottom
                  textAlign={'left'}
                  variant="subtitle1"
                  color="text.secondary">
                  Description
                </Typography>
                <Typography
                  gutterBottom
                  textAlign={'left'}
                  variant="subtitle1"
                  color="text.secondary">
                  {selectedCampaign.description}
                </Typography>
                {selectedCampaign.creator === account && active && (
                  <React.Fragment>
                    <Button variant="contained" color="error">
                      Scrap Project
                    </Button>
                  </React.Fragment>
                )}
              </Grid>
              <Grid />
            </Grid>
          </Card>
        )}
      </Grid>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={submissionLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};
export default ProjectDetails;
