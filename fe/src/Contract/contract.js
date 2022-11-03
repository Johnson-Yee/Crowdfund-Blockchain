import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import { CROWDFUND_ABI, CROWDFUND_ADDRESS } from './config';

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
  return crowdFund.methods
    .startCampaign(title, desc, img, goal, minCon, tierAmt, start, end)
    .send({ from: account[0] });
};
export const backedCampaignABI = async () => {
  const account = await getUserAddress();
  return crowdFund.methods.retrieveAllBackedCampaigns().call({ from: account[0] });
};
