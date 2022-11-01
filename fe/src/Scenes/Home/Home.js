import { useMount } from 'ahooks';
import React, { useEffect } from 'react';
import ProjectCardGrid from '../../Components/ProjectCardGrid/ProjectCardGrid';
import { MOCK_PROJ_LIST } from '../../Constants/Mocks/MockProjList';
import { useDispatch, useSelector } from 'react-redux';
import { getCampaigns } from './Redux/HomeSlice';
import { allCampaignsSelector } from './Redux/Selector';

const Home = () => {
  const dispatch = useDispatch();
  const allCampaigns = useSelector(allCampaignsSelector);

  useMount(() => dispatch(getCampaigns()));

  useEffect(() => {
    console.log(allCampaigns);
  }, [allCampaigns]);

  return <ProjectCardGrid projectList={MOCK_PROJ_LIST} />;
};

export default Home;
