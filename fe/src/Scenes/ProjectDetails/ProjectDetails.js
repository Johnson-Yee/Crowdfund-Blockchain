import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  checkDonatedAmountABI,
  dropCampaignABI,
  makeDonation,
  refundToDonersABI,
  withdrawDonatedAmountABI,
  withDrawFundToOwnAccountABI
} from '../../Contract/contract';
import { set } from 'lodash';
import { setNotification } from '../../AppSlice';
import { utils } from 'ethers';

const ProjectDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedCampaign = useSelector(getCampaignByIdSelector);
  const isLoading = useSelector(getLoadingState);
  let { id } = useParams();
  const [isDonationDisable, setIsDonationDisable] = useState(false);
  const [donationAmount, setDonationAmount] = useState(0);
  const [donatedAmount, setDonatedAmount] = useState(0);
  const [reimburseAllow, setReimburseAllow] = useState(false);
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [isProjectStarted, setIsProjectStarted] = useState(false);
  const [isProjectEnded, setIsProjectEnded] = useState(false);
  const { active, account, activate } = useWeb3React();

  useEffect(() => {
    dispatch(getCampaignById(id));
    setSubmissionLoading(false);
  }, []);

  useEffect(() => {
    const currentTime = Date.now();
    const startingTime = selectedCampaign.startTime * 1000;
    const endingTime = selectedCampaign.endTime * 1000;
    if (startingTime > currentTime) {
      console.log('Project have not started');
      setIsDonationDisable(true);
      setIsProjectStarted(false);
    } else {
      console.log('Project have already started');
      setIsDonationDisable(false);
      setIsProjectStarted(true);
    }
    if (endingTime > currentTime) {
      console.log('Project have not ended.');
      setIsProjectEnded(false);
    } else {
      console.log('Project have ended.');
      setIsProjectEnded(true);
    }
  }, [selectedCampaign]);

  useEffect(() => {
    const currentAmount = parseInt(selectedCampaign.currentAmount);
    const goalAmount = parseInt(selectedCampaign.goal);
    console.log(selectedCampaign.minContribution);
    console.log(currentAmount > goalAmount);
    if (currentAmount > goalAmount) {
      setReimburseAllow(true);
    } else {
      setReimburseAllow(false);
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
      const response = await makeDonation(utils.parseEther(donationAmount), id);
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

  // withdraw donation is a doner
  const onWithdrawalHandler = async () => {
    try {
      setSubmissionLoading(true);
      console.log(donatedAmount);
      const response = await withdrawDonatedAmountABI(id, donatedAmount);
      console.log(response);
      dispatch(getCampaignById(id));
      dispatch(setNotification({ isSuccess: true, message: 'Withdrawal Successful!' }));
    } catch (error) {
      console.log(error);
      dispatch(setNotification({ isSuccess: false, message: 'Withdrawal failed!' }));
    } finally {
      setSubmissionLoading(false);
    }
  };

  // refunding when the goal was not met and campaign has ended
  const refundToDonersHandler = async () => {
    try {
      setSubmissionLoading(true);
      const response = await refundToDonersABI(id);
      console.log(response);
      dispatch(getCampaignById(id));
      dispatch(setNotification({ isSuccess: true, message: 'Refund Successful!' }));
    } catch (error) {
      console.log(error);
      dispatch(setNotification({ isSuccess: false, message: 'Refund failed!' }));
    } finally {
      setSubmissionLoading(false);
    }
  };

  // withdraw your own donation as owner, when goal is met
  const withdrawFundToOwnAccountHandler = async () => {
    try {
      setSubmissionLoading(true);
      const response = await withDrawFundToOwnAccountABI(selectedCampaign.currentAmount, id);
      console.log(response);
      dispatch(getCampaignById(id));
      dispatch(setNotification({ isSuccess: true, message: 'Withdraw Successful!' }));
    } catch (error) {
      console.log(error);
      dispatch(setNotification({ isSuccess: false, message: 'Withdraw failed!' }));
    } finally {
      setSubmissionLoading(false);
    }
  };

  // dropping campaign that has yet to start
  const dropCampaignHandler = async () => {
    try {
      setSubmissionLoading(true);
      const response = await dropCampaignABI(id);
      console.log(response);
      dispatch(setNotification({ isSuccess: true, message: 'Drop Successful! Redirecting...' }));
      setTimeout(() => directToPage('home'), 5000);
    } catch (error) {
      console.log(error);
      dispatch(setNotification({ isSuccess: false, message: 'Drop failed!' }));
    } finally {
      setSubmissionLoading(false);
    }
  };

  const directToPage = (link) => {
    navigate('../' + link);
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
                            Campaign has reached its goal. Wait till it ends to withdraw.
                          </Typography>
                        )}
                        {reimburseAllow && (
                          <Button
                            disabled={!isProjectEnded}
                            variant="contained"
                            onClick={() => withdrawFundToOwnAccountHandler()}>
                            Withdraw Funds to Own Account
                          </Button>
                        )}
                      </React.Fragment>
                    )}
                    {/* non owner interaction */}
                    {selectedCampaign.creator !== account && active && (
                      <React.Fragment>
                        {donatedAmount !== 0 && (
                          <Typography variant="subtitle1" color="text.secondary" noWrap={true}>
                            You have donated {utils.formatEther(donatedAmount.toString())} ETH to
                            this campaign.
                          </Typography>
                        )}
                        {donatedAmount === 0 && !isDonationDisable && (
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
                                'Min Amount(ETH): ' +
                                utils.formatEther(selectedCampaign.minContribution)
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
                            Withdraw Donated Fund ({utils.formatEther(donatedAmount.toString())})
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
                      {utils.formatEther(selectedCampaign.currentAmount)} ETH pledged
                      <br />
                      Goal : {utils.formatEther(selectedCampaign.goal)} ETH
                      <br />
                      {!isProjectStarted && epochToJsSDate(selectedCampaign.startTime) + 'to start'}
                      {isProjectStarted &&
                        !isProjectEnded &&
                        epochToJsSDate(selectedCampaign.endTime) + 'to go'}
                      {isProjectEnded && 'Campaign has ended'}
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
                    {isProjectEnded && (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => refundToDonersHandler()}>
                        Refund to doners
                      </Button>
                    )}
                    {!isProjectStarted && (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => dropCampaignHandler()}>
                        Drop Project
                      </Button>
                    )}
                    {!isProjectEnded && isProjectStarted && (
                      <Typography
                        gutterBottom
                        textAlign={'center'}
                        variant="subtitle1"
                        color="text.secondary">
                        Campaign in progress
                      </Typography>
                    )}
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
