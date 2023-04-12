import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Alert, Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { login } from '../redux/features/login/loginSlice';

interface Field {
  value: string;
  touched: boolean;
  hasError: boolean;
}
interface actionType {
  field: 'username' | 'password';
  type: 'change' | 'validate';
  value?: string;
  hasError?: boolean;
}

interface State {
  username: Field;
  password: Field;
}

const reducer = (
  state: { username: Field; password: Field },
  action: actionType
): State => {
  switch (action.type) {
    case 'change': {
      const stateClone = JSON.parse(JSON.stringify(state));
      stateClone[action.field].value = action.value;
      if (!stateClone[action.field].touched)
        stateClone[action.field].touched = true;
      if (stateClone[action.field].hasError && action.value)
        stateClone[action.field].hasError = false;
      return stateClone;
    }
    case 'validate': {
      const stateClone = JSON.parse(JSON.stringify(state));
      if (action.hasError) {
        stateClone[action.field].hasError = true;
        return stateClone;
      }
      return state;
    }
    default:
      throw new Error(`Action type of: ${action.type} is not implemented.`);
  }
};

export default function SignIn(): JSX.Element {
  const [error, setError] = React.useState<string>('');

  const [state, dispatch] = React.useReducer(reducer, {
    username: {
      hasError: false,
      touched: false,
      value: '',
    } as Field,
    password: {
      hasError: false,
      touched: false,
      value: '',
    } as Field,
  });

  const reduxDispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((store) => store.login.isLoggedIn);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = state.username.value;
    const password = state.password.value;
    if (!username)
      dispatch({ field: 'username', type: 'validate', hasError: true });
    if (!password)
      dispatch({ field: 'password', type: 'validate', hasError: true });
    if (!username || !password) return;
    reduxDispatch(login({ username, password }));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(event) =>
              dispatch({
                field: 'username',
                value: event.target.value,
                type: 'change',
              })
            }
            error={
              (state.username.touched && !state.username.value) ||
              state.username.hasError
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event) =>
              dispatch({
                field: 'password',
                value: event.target.value,
                type: 'change',
              })
            }
            error={
              (state.password.touched && !state.password.value) ||
              state.password.hasError
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
      >
        <Alert
          onClose={() => setError('')}
          severity="error"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
}
