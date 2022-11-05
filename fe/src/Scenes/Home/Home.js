import { useMount } from 'ahooks';
import React, { useEffect, useState } from 'react';
import ProjectCardGrid from '../../Components/ProjectCardGrid/ProjectCardGrid';
import { MOCK_PROJ_LIST } from '../../Constants/Mocks/MockProjList';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearBackedID,
  getBackedCampaignIds,
  getCampaigns,
  setUserAddress
} from './Redux/HomeSlice';
import {
  allCampaignsSelector,
  myCampaignsSelector,
  backedCampaignsSelector
} from './Redux/Selector';
import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import {
  ENDED_CAMPAIGN,
  ONGOING_CAMPAIGN,
  STARTING_CAMPAIGN
} from '../../Constants/CampaignStatus';

const ALL_CAMPAIGNS = 'All Campaigns';
const MY_CAMPAIGNS = 'My Campaigns';
const BACKED_CAMPAIGNS = 'Backed Campaigns';
const ALL_STATUS = 'All Status';

const Home = () => {
  const dispatch = useDispatch();
  // Selector
  const allCampaigns = useSelector(allCampaignsSelector);
  const myCampaigns = useSelector(myCampaignsSelector);
  const backedCampaigns = useSelector(backedCampaignsSelector);
  const { account } = useWeb3React();
  // Local state
  const [filterApplied, setFilterApplied] = useState(ALL_CAMPAIGNS);
  const [statusFilter, setStatusFilter] = useState(ALL_STATUS);

  // Local function
  const selectCampaigns = () => {
    switch (filterApplied) {
      case ALL_CAMPAIGNS:
        return allCampaigns;
      case MY_CAMPAIGNS:
        console.log(myCampaigns);
        return myCampaigns;
      case BACKED_CAMPAIGNS:
        return backedCampaigns;
      default:
        return allCampaigns;
    }
  };
  const renderCampaigns = () => {
    const campaigns = selectCampaigns();
    if (statusFilter == ALL_STATUS) return campaigns;
    return campaigns?.filter((c) => c.status == statusFilter);
  };

  // Hooks
  useMount(() => dispatch(getCampaigns()));
  useEffect(() => {
    dispatch(setUserAddress(account));
    if (account) dispatch(getBackedCampaignIds());
    else dispatch(clearBackedID());
  }, [account]);

  // Event Handler
  const handleFilterChange = (event, newFilter) => {
    if (!newFilter) newFilter = ALL_CAMPAIGNS;
    setFilterApplied(newFilter);
  };
  const handleStatusChange = (event, newFilter) => {
    console.log(newFilter);
    if (!newFilter) newFilter = ALL_STATUS;
    setStatusFilter(newFilter);
  };

  return (
    <>
      <ToggleButtonGroup
        sx={{
          marginBottom: 2
        }}
        color="primary"
        value={filterApplied}
        exclusive
        size="small"
        onChange={handleFilterChange}
        aria-label="Platform">
        <ToggleButton value={ALL_CAMPAIGNS}>All Campaigns</ToggleButton>
        <ToggleButton value={MY_CAMPAIGNS}>My Campaigns</ToggleButton>
        <ToggleButton value={BACKED_CAMPAIGNS}>Backed Campaigns</ToggleButton>
      </ToggleButtonGroup>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h1">{filterApplied}</Typography>
      </Box>
      <ToggleButtonGroup
        sx={{
          marginBottom: 2
        }}
        color="primary"
        value={statusFilter}
        exclusive
        size="small"
        onChange={handleStatusChange}
        aria-label="Platform">
        <ToggleButton value={ALL_STATUS}>All</ToggleButton>
        <ToggleButton style={{ backgroundColor: '#388e3c' }} value={ONGOING_CAMPAIGN}>
          Ongoing
        </ToggleButton>
        <ToggleButton style={{ backgroundColor: '#f57c00' }} value={STARTING_CAMPAIGN}>
          Starting
        </ToggleButton>
        <ToggleButton style={{ backgroundColor: '#d32f2f' }} value={ENDED_CAMPAIGN}>
          Ended
        </ToggleButton>
      </ToggleButtonGroup>
      {renderCampaigns() ? <ProjectCardGrid projectList={renderCampaigns()} /> : <></>}
    </>
  );
};

export default Home;
