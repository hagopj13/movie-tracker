import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import Dialog from '../../../UI/Dialog/Dialog';
import LoginForm from './Form/LoginForm';
import AuthActionTypes from '../../../../store/auth/auth.types';
import { login, loginClear } from '../../../../store/auth/auth.actions';
import { createIsLoadingSelector } from '../../../../store/api/loading/loading.selectors';
import { createErrorSelector } from '../../../../store/api/error/error.selectors';

type Props = {
  isOpen: boolean,
  isLoginLoading: boolean,
  loginError: string,
  onClose: () => void,
  onLogin: ({ username: string, password: string }) => void,
  onLoginClear: () => void,
};

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(0.5, 5, 1),
    marginBottom: theme.spacing(2),
  },
  contentText: {
    marginBottom: theme.spacing(2),
    maxWidth: '45ch',
  },
}));

const DIALOG_TITLE = 'Login';

const LoginDialog = (props: Props) => {
  const { isOpen, isLoginLoading, loginError, onClose, onLogin, onLoginClear } = props;
  const classes = useStyles();

  const renderInfoText = () => (
    <Typography className={classes.contentText}>
      This app gets its data from the TMDb APIs. To view your account information, login with your
      TMDb credentials in the form below. To create one,&nbsp;
      <Link target="_blank" href="https://www.themoviedb.org/account/signup" color="primary">
        click here
      </Link>
      .
    </Typography>
  );

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={DIALOG_TITLE} onExited={onLoginClear}>
      <DialogContent className={classes.content}>
        {renderInfoText()}
        <LoginForm isLoginLoading={isLoginLoading} loginError={loginError} onSubmit={onLogin} />
      </DialogContent>
    </Dialog>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoginLoading: createIsLoadingSelector([AuthActionTypes.LOGIN]),
  loginError: createErrorSelector([AuthActionTypes.LOGIN]),
});

const mapDispatchToProps = {
  onLogin: login,
  onLoginClear: loginClear,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginDialog);
