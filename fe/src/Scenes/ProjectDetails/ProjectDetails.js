import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  LinearProgress,
  Typography,
  Box,
  Container,
  Stack,
  Grid,
  Button
} from '@mui/material';
import { MOCK_PROJ_LIST } from '../../Constants/Mocks/MockProjList';

const ProjectDetails = () => {
  let { id } = useParams();
  const [projectdetail, setProjectdetail] = useState();
  // obtain project detail
  useEffect(() => {
    // obtain project detail
    const selectedProject = MOCK_PROJ_LIST.filter((project) => project.id === id);
    setProjectdetail(selectedProject);
  }, []);

  console.log(id);
  console.log(projectdetail);
  return (
    <Grid container spacing={0} direction="column" alignItems="center" justify="center">
      <Card
        className="animate__animated animate__fadeIn"
        raised
        sx={{
          height: 'auto',
          width: '90%',
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          borderRadius: '0px',
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
                borderRadius: '0px 0px 0px 0px'
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
                  The Dark One Plush
                </Typography>
                <LinearProgress variant="determinate" value={10} />
                <Button variant="contained">Scrap Project And Refund</Button>
                <Button variant="contained" disabled>
                  Withdraw Funds to Own Account
                </Button>
                <Typography variant="subtitle1" color="text.secondary">
                  By: Ethan
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  50% funded
                  <br />
                  500 ETH pledged
                  <br />
                  30 days to go
                </Typography>
              </Stack>
            </CardContent>
          </Box>
          <Grid sx={{ padding: 2 }}>
            <Typography gutterBottom textAlign={'left'} variant="subtitle1" color="text.secondary">
              Description
            </Typography>
            <Typography gutterBottom textAlign={'left'} variant="subtitle1" color="text.secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            </Typography>
          </Grid>
          <Grid />
        </Grid>
      </Card>
    </Grid>
  );
};
export default ProjectDetails;
