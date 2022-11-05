import { ENDED_CAMPAIGN, ONGOING_CAMPAIGN, STARTING_CAMPAIGN } from '../Constants/CampaignStatus';

export const statusCheck = (startTime, endTime) => {
  const now = new Date().getTime() / 1000;
  if (startTime > now) return STARTING_CAMPAIGN;
  if (endTime > now) return ONGOING_CAMPAIGN;
  return ENDED_CAMPAIGN;
};
