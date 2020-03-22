import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '../../common/dialog/dialogTitle/DialogTitle';
import LoginForm from './loginForm/LoginForm';

type Props = {
  open: boolean,
  onClose: () => void,
};

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(2, 4, 1),
    marginBottom: theme.spacing(2),
  },
}));

const LoginDialog = (props: Props) => {
  const { open, onClose } = props;

  const classes = useStyles();

  const handleSubmit = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth={false}>
      <DialogTitle onClose={onClose}>Login</DialogTitle>
      <DialogContent className={classes.content}>
        <LoginForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
