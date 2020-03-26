import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import DialogTitle from '../../common/dialog/dialogTitle/DialogTitle';
import LoginForm from './loginForm/LoginForm';
import { login } from '../../../redux/auth/auth.actions';

type Props = {
  open: boolean,
  onClose: () => void,
  onLogin: ({ username: string, password: string }) => void,
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

const LoginDialog = (props: Props) => {
  const { open, onClose } = props;

  const classes = useStyles();

  const handleSubmit = (data) => {
    props.onLogin(data);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth={false}>
      <DialogTitle onClose={onClose}>Login</DialogTitle>
      <DialogContent className={classes.content}>
        <Typography className={classes.contentText}>
          This app gets its data from the TMDb APIs. To view your account information, login with
          your TMDb credentials in the form below. To create one,&nbsp;
          <Link target="_blank" href="https://www.themoviedb.org/account/signup" color="primary">
            click here
          </Link>
          .
        </Typography>
        <LoginForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
};

const mapDispatchToProps = {
  onLogin: login,
};

export default connect(undefined, mapDispatchToProps)(LoginDialog);
