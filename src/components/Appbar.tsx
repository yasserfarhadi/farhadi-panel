import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setSearchParam } from '../redux/features/users/usersSlice';
import Badge, { BadgeProps } from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { User } from '../api/Models/User';
import emotionStyled from '@emotion/styled';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 6px',
    marginRight: '10px',
  },
}));

interface Props {
  isLoggedIn: boolean;
  username: string;
  logoutHandler: () => void;
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.main, 0.8),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 1),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  flexGrow: 1,
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: '100%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  fontSize: '18px',

  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 6, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const StyledSearchContainer = emotionStyled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;

`;

const PrimarySearchAppBar: React.FC<Props> = ({
  isLoggedIn,
  username = '',
  logoutHandler,
}) => {
  const dispatch = useAppDispatch();
  const { users, searchParam } = useAppSelector((store) => ({
    searchParam: store.users.searchParam,
    users: store.users.data,
  }));

  const numberOfFiltered = React.useMemo(
    (listArr: User[] = []) => {
      users.forEach((user) => {
        if (
          user.name.toLowerCase().includes(searchParam.toLowerCase()) ||
          user.username.toLowerCase().includes(searchParam.toLowerCase()) ||
          user.email.toLowerCase().includes(searchParam.toLowerCase())
        ) {
          listArr.push(user);
        }
      });

      return listArr.length;
    },
    [users, searchParam]
  );
  let timer: ReturnType<typeof setTimeout>;
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      dispatch(setSearchParam(event.target.value));
    }, 100);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar sx={{ display: 'flex' }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                display: {
                  xs: 'none',
                  sm: 'block',
                  width: '150px',
                  justifySelf: 'flex-start',
                },
              }}
            >
              {username}
            </Typography>
            {isLoggedIn && (
              <StyledSearchContainer>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    onChange={inputChangeHandler}
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </Search>
                {searchParam !== '' && (
                  <IconButton aria-label="cart">
                    <StyledBadge
                      badgeContent={numberOfFiltered}
                      color="secondary"
                    ></StyledBadge>
                  </IconButton>
                )}
              </StyledSearchContainer>
            )}
            {
              <Box sx={{ marginLeft: 'auto' }}>
                {isLoggedIn ? (
                  <Button sx={{ color: '#FFFFFF' }} onClick={logoutHandler}>
                    Logout
                  </Button>
                ) : (
                  <Link to="/login">
                    <Button sx={{ color: '#FFFFFF' }}>Login</Button>
                  </Link>
                )}
              </Box>
            }
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default PrimarySearchAppBar;
