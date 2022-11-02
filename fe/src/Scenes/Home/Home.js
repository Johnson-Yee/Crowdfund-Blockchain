import { useMount } from 'ahooks';
import React, { useEffect, useState } from 'react';
import ProjectCardGrid from '../../Components/ProjectCardGrid/ProjectCardGrid';
import { MOCK_PROJ_LIST } from '../../Constants/Mocks/MockProjList';
import { useDispatch, useSelector } from 'react-redux';
import { getCampaigns } from './Redux/HomeSlice';
import { allCampaignsSelector, selectCampaigns } from './Redux/Selector';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { filter } from 'lodash';

const Home = () => {
  const dispatch = useDispatch();
  const allCampaigns = useSelector(allCampaignsSelector);
  const filteredCampaigns = useSelector(selectCampaigns);
  const [filterApplied, setFilterApplied] = useState('allprojects');

  const handleFilterChange = (event, newFilter) => {
    setFilterApplied(newFilter);
  };

  useMount(() => dispatch(getCampaigns()));

  useEffect(() => {
    console.log(allCampaigns);
  }, [allCampaigns]);

  useEffect(() => {
    console.log(filteredCampaigns);
  }, [filteredCampaigns]);

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
        <ToggleButton value="allprojects">All Projects</ToggleButton>
        <ToggleButton value="myprojects">My Projects</ToggleButton>
        <ToggleButton value="backedprojects">Backed Projects</ToggleButton>
      </ToggleButtonGroup>
      <ProjectCardGrid projectList={MOCK_PROJ_LIST} />
    </>
  );
};

export default Home;
