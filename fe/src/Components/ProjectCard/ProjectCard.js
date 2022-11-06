import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  LinearProgress,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/system';
import React, { useEffect } from 'react';
import { statusCheck, timeLeft } from '../../Utils/dateParser';
import {
  ENDED_CAMPAIGN,
  ONGOING_CAMPAIGN,
  STARTING_CAMPAIGN
} from '../../Constants/CampaignStatus';

const ProjectCard = ({
  id,
  status,
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
  const percentageFunded = currAmt ? Math.round((currAmt / goal) * 100) : 0;
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
      const t = new Date(startTime * 1000).toLocaleDateString();
      return `Starts on ${t}!`;
    } else if (now >= deadline) {
      return `Ended!`;
    } else return `Ends on ${new Date(deadline * 1000).toLocaleDateString()} `;
  };
  const statusChipColor =
    status == ONGOING_CAMPAIGN ? 'success' : status == STARTING_CAMPAIGN ? 'warning' : 'error';

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
          <Stack direction="row" spacing={1}>
            <Typography gutterBottom variant="h6" noWrap height="15%">
              {title}
            </Typography>
            <Chip label={status} color={statusChipColor} />
          </Stack>
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
          <LinearProgress
            variant="determinate"
            value={percentageFunded > 100 ? 100 : percentageFunded}
          />
          <Typography variant="subtitle1" color="text.secondary">
            {percentageFunded}% funded
            <br />
            Goal: {goal} ETH
            <br />
            Pledged: {currAmt} ETH
            <br />
            {deadlineField()}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default ProjectCard;
