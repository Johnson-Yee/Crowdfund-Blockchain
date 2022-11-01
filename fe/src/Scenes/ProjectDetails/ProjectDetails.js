import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  LinearProgress,
  Typography,
  Box,
  Stack,
  Grid,
  Button
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { MOCK_PROJ_LIST } from '../../Constants/Mocks/MockProjList';
import { useWeb3React } from '@web3-react/core';

const ProjectDetails = () => {
  let { id } = useParams();
  const [projectdetail, setProjectdetail] = useState([]);
  const [isOwnProject, setIsOwnProject] = useState();
  const { active, account } = useWeb3React();

  useEffect(() => {
    // obtain project detail
    console.log(MOCK_PROJ_LIST);
    const selectedProject = MOCK_PROJ_LIST.filter((project) => project.id == id);
    // check for ownership
    if (selectedProject[0].creator === 'WenFeng') {
      setIsOwnProject(true);
    }
    setProjectdetail(selectedProject);
  }, []);

  //   {
  //     "id": 2,
  //     "imageURL": "https://picsum.photos/400/300?random=2",
  //     "title": "Facebook",
  //     "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //     "creator": "WenFeng",
  //     "percFunded": 60,
  //     "amtPledged": 1000,
  //     "deadline": 1000
  // }

  console.log(projectdetail);
  console.log(active);
  console.log(account);

  // if user not logged in, prompt to log in
  const NonLoggedUserInteraction = () => {
    return <Button variant="contained">Connect Wallet to back campaigns</Button>;
  };

  // need to check whether there is any fund to withdraw first
  const OwnerInteraction = () => {
    return (
      <React.Fragment>
        <Button variant="contained">Scrap Project And Refund</Button>
        <Button variant="contained">Withdraw Funds to Own Account</Button>
      </React.Fragment>
    );
  };

  // need to check whether the user have already donated to a campaign
  const NonOwnerInteraction = () => {
    return (
      <React.Fragment>
        <Button variant="contained">Back Project</Button>
        <Button variant="contained">Withdraw Fund</Button>
      </React.Fragment>
    );
  };

  return (
    <Grid container spacing={0} direction="column" alignItems="center" justify="center">
      {projectdetail.map((projectdetail, index) => (
        <Card
          key={index}
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
                src={'https://picsum.photos/400/300?random=2'}
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
                    {projectdetail.title}
                  </Typography>
                  <LinearProgress variant="determinate" value={projectdetail.percFunded} />
                  {!active && <NonLoggedUserInteraction />}
                  {isOwnProject && active && <OwnerInteraction />}
                  {!isOwnProject && active && <NonOwnerInteraction />}
                  <Typography variant="subtitle1" color="text.secondary">
                    By: {projectdetail.creator}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {projectdetail.percFunded}% funded
                    <br />
                    {projectdetail.amtPledged} ETH pledged
                    <br />
                    {projectdetail.deadline} days to go
                  </Typography>
                </Stack>
              </CardContent>
            </Box>
            <Grid sx={{ padding: 2 }}>
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
                {projectdetail.desc}
              </Typography>
            </Grid>
            <Grid />
          </Grid>
        </Card>
      ))}
    </Grid>
  );
};
export default ProjectDetails;
