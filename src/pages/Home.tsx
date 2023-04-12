import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import Styled from '@emotion/styled';

const HomePageWrapper = Styled.div`
  width: 100%;
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledLink = Styled(Link)`

  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Home: React.FC = () => {
  return (
    <HomePageWrapper>
      <Typography variant="h3">تسک آزمایشی شرکت رامند - یاسر فرهادی</Typography>
      <Button size="large" variant="outlined" sx={{ mt: 4, borderRadius: 4 }}>
        <StyledLink to="/login">
          Login
          <DoubleArrowIcon sx={{ fontSize: '60px' }} />
        </StyledLink>
      </Button>
    </HomePageWrapper>
  );
};

export default Home;
