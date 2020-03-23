import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import PasswordTextField from '../../../common/input/passwordTextField/PasswordTextField';

type Props = {
  onSubmit: (data) => void,
};

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      display: 'block',
      marginBottom: theme.spacing(0.5),
    },
  },
  submitButton: {
    marginLeft: 'auto',
  },
}));

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

const LoginForm = (props: Props) => {
  const { onSubmit } = props;
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
      <Button
        type="submit"
        className={classes.submitButton}
        size="large"
        variant="outlined"
        color="primary"
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
