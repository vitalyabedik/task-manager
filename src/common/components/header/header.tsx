import React from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Logout } from '@mui/icons-material';
import { LinearProgress } from '@mui/material';

import { useActions, useAppSelector } from 'common/hooks';
import { RequestStatusType } from 'app/model/app.slice';
import { selectAuthIsLoggedIn } from 'features/auth/model/auth.selectors';
import { authThunks } from 'features/auth/model/auth.slice';

export const Header = (): JSX.Element => {
  const status = useAppSelector<RequestStatusType>((state) => state.app.status);
  const isLoggedIn = useAppSelector(selectAuthIsLoggedIn);

  const { logout } = useActions(authThunks);

  const onLogoutHandler = () => logout();

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Task manager
        </Typography>
        {isLoggedIn && (
          <Button onClick={onLogoutHandler} color='inherit'>
            <Logout />
          </Button>
        )}
      </Toolbar>
      {status === 'loading' && <LinearProgress />}
    </AppBar>
  );
};
