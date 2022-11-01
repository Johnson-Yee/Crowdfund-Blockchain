import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  LinearProgress,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/system';
import React from 'react';

const ProjectCard = ({ id, imageURL, title, desc, amtPledged, percFunded, deadline, creator }) => {
  console.log(id);
  const navigate = useNavigate();

  const directToProjectDetails = (id) => {
    console.log(id);
    navigate('../' + 'ProjectDetails/' + id, { replace: false });
  };

  return (
    <Card
      className="animate__animated animate__fadeIn"
      raised
      sx={{ height: '540px' }}
      onClick={() => directToProjectDetails(id)}>
      <CardActionArea sx={{ height: '100%' }}>
        <CardMedia
          item="true"
          component="img"
          src={imageURL}
          sx={{ height: '55%', objectFit: 'contain' }}
        />
        <CardContent sx={{ textAlign: 'left', bgcolor: '#D9D9D9', height: '45%' }}>
          <Typography gutterBottom variant="h6" noWrap height="15%">
            {title}
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            color="text.secondary"
            height="25%"
            sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {desc}
          </Typography>
          <Typography gutterBottom variant="subtitle1" color="text.secondary">
            By: {creator}
          </Typography>
          <LinearProgress variant="determinate" value={percFunded} />
          <Typography variant="subtitle1" color="text.secondary">
            {percFunded}% funded
            <br />
            {amtPledged} ETH pledged
            <br />
            {deadline} days to go
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default ProjectCard;
