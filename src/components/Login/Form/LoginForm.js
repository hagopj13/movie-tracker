// @flow
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import PasswordTextField from 'components/Input/PasswordTextField/PasswordTextField';

type Props = {
  isLoginLoading: boolean,
  loginError: string,
  onSubmit: ({ username: string, password: string }) => void,
};

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      display: 'block',
      marginBottom: theme.spacing(0.5),
    },
  },
  bottomContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  errorText: {
    marginLeft: theme.spacing(1.5),
  },
}));

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

const LoginForm = (props: Props) => {
  const { isLoginLoading, loginError, onSubmit } = props;

  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm({
    mode: 'onSubmit',
    validationSchema: schema,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
      <TextField
        name="username"
        inputRef={register}
        autoFocus
        fullWidth
        size="small"
        variant="outlined"
        label="Username"
        error={!!errors.username}
        helperText={errors.username?.message ?? ' '}
      />
      <PasswordTextField
        name="password"
        inputRef={register}
        fullWidth
        size="small"
        variant="outlined"
        label="Password"
        error={!!errors.password}
        helperText={errors.password?.message ?? ' '}
      />
      <div className={classes.bottomContainer}>
        <Typography color="error" className={classes.errorText}>
          {loginError}
        </Typography>
        <Button
          type="submit"
          className={classes.submitButton}
          size="large"
          variant="outlined"
          color="primary"
          disabled={isLoginLoading}
        >
          Login
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
