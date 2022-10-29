import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  LinearProgress,
  Typography,
  Box
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
    <>
      <Card
        className="animate__animated animate__fadeIn"
        raised
        sx={{
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          padding: 2,
          borderRadius: 5,
          bgcolor: '#D9D9D9'
        }}>
        <CardActionArea sx={{ height: '100%', flexGrow: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <CardMedia
              item="true"
              component="img"
              src={'https://picsum.photos/400/300?random=2'}
              sx={{ height: '20vw', width: '25vw', objectFit: 'contain', flexGrow: 1 }}
            />
            <CardContent
              sx={{ textAlign: 'left', bgcolor: '#D9D9D9', height: 'auto', flexGrow: 2 }}>
              <Typography gutterBottom variant="h6" noWrap height="15%">
                Test title
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                color="text.secondary"
                height="25%"
                sx={{ textOverflow: 'ellipsis' }}>
                desc
              </Typography>
              <Typography gutterBottom variant="subtitle1" color="text.secondary">
                By: creator
              </Typography>
              <LinearProgress variant="determinate" value={10} />
              <Typography variant="subtitle1" color="text.secondary">
                percFunded% funded
                <br />
                amtPledged ETH pledged
                <br />
                deadline days to go
              </Typography>
            </CardContent>
          </Box>
          <Typography gutterBottom variant="subtitle1" color="text.secondary">
            Description
          </Typography>
          <Typography gutterBottom variant="subtitle1" color="text.secondary">
            Description
          </Typography>
          <Typography gutterBottom variant="subtitle1" color="text.secondary">
            Description
          </Typography>
          <Typography gutterBottom variant="subtitle1" color="text.secondary">
            Description
          </Typography>
          <Typography gutterBottom variant="subtitle1" color="text.secondary">
            Description
          </Typography>
          <Typography gutterBottom variant="subtitle1" color="text.secondary">
            Description
          </Typography>
        </CardActionArea>
      </Card>
    </>
  );
};
export default ProjectDetails;
