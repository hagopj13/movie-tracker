import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

type Props = {
  onSubmit: (data) => void,
};

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      display: 'block',
      marginBottom: theme.spacing(1),
    },
  },
  submitButton: {
    color: theme.palette.primary.main,
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
        variant="outlined"
        label="Username"
        error={!!errors.username}
        helperText={errors.username?.message ?? ' '}
      />
      <TextField
        name="password"
        inputRef={register}
        type="password"
        variant="outlined"
        label="Password"
        error={!!errors.password}
        helperText={errors.password?.message ?? ' '}
      />
      <Button type="submit" className={classes.submitButton} variant="outlined" size="large">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
