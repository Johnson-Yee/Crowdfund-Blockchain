import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import { CROWDFUND_ABI, CROWDFUND_ADDRESS } from './config';
import { utils } from 'ethers';
import { toString } from 'lodash';

const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
const crowdFund = new web3.eth.Contract(CROWDFUND_ABI, CROWDFUND_ADDRESS);

export const getUserAddress = web3.eth.getAccounts;
// export const getCampaignCount = () => {
//   return crowdFund.methods.campaignCount().call();
// };
export const getAllCampaignsABI = () => {
  return crowdFund.methods.getAllCampaigns().call();
};
export const startCampaignABI = async (title, desc, img, goal, minCon, tierAmt, start, end) => {
  const account = await getUserAddress();
  goal = utils.parseEther(toString(goal));
  minCon = utils.parseEther(toString(minCon));
  return crowdFund.methods
    .startCampaign(title, desc, img, goal, minCon, tierAmt, start, end)
    .send({ from: account[0] });
};
export const backedCampaignABI = async () => {
  const account = await getUserAddress();
  return crowdFund.methods.retrieveAllBackedCampaigns().call({ from: account[0] });
};

export const createdCampaignABI = async () => {
  const account = await getUserAddress();
  return crowdFund.methods.retrieveAllCreatedCampaigns().call({ from: account[0] });
};

export const getCampaignByIndexABI = async (campaignIndex) => {
  return crowdFund.methods.ongoingCampaigns(campaignIndex).call();
};

export const makeDonation = async (amount, campaignId) => {
  const account = await getUserAddress();
  return crowdFund.methods.donate(campaignId).send({ from: account[0], value: parseInt(amount) });
};

export const checkDonatedAmountABI = async (campaignId) => {
  const account = await getUserAddress();
  return crowdFund.methods.potentialDonations(campaignId, account[0]).call();
};

export const withdrawDonatedAmountABI = async (campaignId, amountInWei) => {
  const account = await getUserAddress();
  return crowdFund.methods.withdraw(campaignId, amountInWei).send({ from: account[0] });
};

export const refundToDonersABI = async (campaignId) => {
  const account = await getUserAddress();
  return crowdFund.methods.reimburse(campaignId).send({ from: account[0] });
};

export const withDrawFundToOwnAccountABI = async (amount, campaignId) => {
  const account = await getUserAddress();
  return crowdFund.methods.payoutOnGoalMet(campaignId).send({ from: account[0] });
};

export const dropCampaignABI = async (campaignId) => {
  const account = await getUserAddress();
  return crowdFund.methods.dropCampaign(campaignId).send({ from: account[0] });
};
