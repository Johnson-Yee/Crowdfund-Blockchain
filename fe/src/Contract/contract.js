import Web3 from 'web3';
import { CROWDFUND_ABI, CROWDFUND_ADDRESS } from './config';

const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
const crowdFund = new web3.eth.Contract(CROWDFUND_ABI, CROWDFUND_ADDRESS);

export const getCampaignCount = () => {
  return crowdFund.methods.campaignCount().call();
};
export const getOngoingCampaigns = () => {
  return crowdFund.methods.ongoingCampaigns().call();
};
