// @flow
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const PasswordTextField = (props: any) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPasswordClick = () => setShowPassword(!showPassword);

  const handleShowPasswordMouseDown = (event) => event.preventDefault();

  return (
    <TextField
      {...props}
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={handleShowPasswordClick}
              onMouseDown={handleShowPasswordMouseDown}
              edge="end"
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordTextField;
