import { useMount } from 'ahooks';
import React from 'react';
import ProjectCardGrid from '../../Components/ProjectCardGrid/ProjectCardGrid';
import { MOCK_PROJ_LIST } from '../../Constants/Mocks/MockProjList';
import { getCampaignCount, getOngoingCampaigns } from '../../Contract/contract';

const Home = () => {
  useMount(async () => {
    const campaignCount = await getOngoingCampaigns();
    console.log(campaignCount);
  });

  return <ProjectCardGrid projectList={MOCK_PROJ_LIST} />;
};

export default Home;
