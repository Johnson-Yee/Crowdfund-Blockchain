import { useMount } from 'ahooks';
import React, { useEffect, useState } from 'react';
import ProjectCardGrid from '../../Components/ProjectCardGrid/ProjectCardGrid';
import { MOCK_PROJ_LIST } from '../../Constants/Mocks/MockProjList';
import { useDispatch, useSelector } from 'react-redux';
import { getBackedCampaignIds, getCampaigns, setUserAddress } from './Redux/HomeSlice';
import {
  allCampaignsSelector,
  myCampaignsSelector,
  backedCampaignsSelector
} from './Redux/Selector';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useWeb3React } from '@web3-react/core';

const ALL_CAMPAIGNS = 'allCampaigns';
const MY_CAMPAIGNS = 'myCampaigns';
const BACKED_CAMPAIGNS = 'backedCampaigns';

const Home = () => {
  const dispatch = useDispatch();
  // Selector
  const allCampaigns = useSelector(allCampaignsSelector);
  const myCampaigns = useSelector(myCampaignsSelector);
  const backedCampaigns = useSelector(backedCampaignsSelector);
  const { account } = useWeb3React();
  // Local state
  const [filterApplied, setFilterApplied] = useState('allCampaigns');

  // Local function
  const renderCampaigns = () => {
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

  // Hooks
  useMount(() => dispatch(getCampaigns()));
  useEffect(() => {
    dispatch(setUserAddress(account));
    dispatch(getBackedCampaignIds());
  }, [account]);

  // Event Handler
  const handleFilterChange = (event, newFilter) => {
    console.log(newFilter);
    setFilterApplied(newFilter);
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
        <ToggleButton value="allCampaigns">All Campaigns</ToggleButton>
        <ToggleButton value="myCampaigns">My Campaigns</ToggleButton>
        <ToggleButton value="backedCampaigns">Backed Campaigns</ToggleButton>
      </ToggleButtonGroup>
      {renderCampaigns() ? <ProjectCardGrid projectList={renderCampaigns()} /> : <></>}
    </>
  );
};

export default Home;
