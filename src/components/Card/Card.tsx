import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import styled from '@emotion/styled';

import person from '../../assets/person.png';

const StyledCard = styled(Card)`
  width: 180px;
  height: 300px;
`;

const StyledCardActionArea = styled(CardActionArea)`
  width: 100%;
  height: 100%;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledCardMedia = styled(CardMedia)`
  width: 150px;
  height: 150px;
`;

const StyledCardContent = styled(CardContent)`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  word-wrap: break-word;
`;

interface Props {
  name: string;
  username: string;
  email: string;
  id: number;
  setModalHandler: (id: number) => void;
}

const UserCard: React.FC<Props> = ({
  name,
  username,
  email,
  id,
  setModalHandler,
}) => {
  return (
    <StyledCard onClick={() => setModalHandler(id)}>
      <StyledCardActionArea>
        <StyledCardMedia image={person} />
        <StyledCardContent>
          <Typography gutterBottom variant="body1" component="div">
            {name}
          </Typography>
          <Typography gutterBottom variant="body1" component="div">
            {username}
          </Typography>
          <Typography
            gutterBottom
            variant="body1"
            component="div"
            sx={{
              wordWrap: 'break-word',
              textOverflow: 'ellipsis',
              width: 160,
            }}
          >
            {email}
          </Typography>
        </StyledCardContent>
      </StyledCardActionArea>
    </StyledCard>
  );
};

export default UserCard;
