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
import React, { useEffect } from 'react';

const ProjectCard = ({
  id,
  title,
  desc,
  imageURL,
  currAmt,
  goal,
  startTime,
  deadline,
  claimed,
  clickable = true
}) => {
  console.log(id);
  const percentageFunded = currAmt ? Math.round((currAmt / goal) * 100) / 10 : 0;
  const navigate = useNavigate();

  const directToProjectDetails = (id) => {
    navigate('../' + 'ProjectDetails/' + id, { replace: false });
  };

  useEffect(() => {
    console.log(imageURL);
  }, [imageURL]);

  const deadlineField = () => {
    const now = new Date().getTime() / 1000;
    if (now <= startTime) {
      return `Starts on ...!`;
    } else if (now >= deadline) {
      return `Ended!`;
    } else return `... days left`;
  };

  return (
    <Card
      className="animate__animated animate__fadeIn"
      raised
      sx={{ height: '540px', width: '100%' }}
      onClick={clickable ? () => directToProjectDetails(id) : null}>
      <CardActionArea sx={{ height: '100%' }}>
        <CardMedia
          item="true"
          component="img"
          src={imageURL}
          onError={(e) => {
            e.target.src =
              'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png';
          }}
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
          {/* <Typography
            gutterBottom
            variant="subtitle1"
            color="text.secondary"
            sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
            By: {creator}
          </Typography> */}
          <LinearProgress variant="determinate" value={percentageFunded} />
          <Typography variant="subtitle1" color="text.secondary">
            {percentageFunded}% funded
            <br />
            Goal: {goal} Wei
            <br />
            Pledged: {currAmt} Wei
            <br />
            {deadlineField()}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default ProjectCard;
