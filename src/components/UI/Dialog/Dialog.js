import React from 'react';
import MuiDialog from '@material-ui/core/Dialog';

import DialogTitle from './Title/DialogTitle';

type Props = {
  isOpen: boolean,
  title: string,
  children: React.ReactNode,
  onClose: () => void,
};

const Dialog = (props: Props) => {
  const { isOpen, title, onClose, children, ...dialogProps } = props;

  return (
    <MuiDialog open={isOpen} onClose={onClose} disableRestoreFocus {...dialogProps}>
      <DialogTitle onClose={onClose}>{title}</DialogTitle>
      {children}
    </MuiDialog>
  );
};

export default Dialog;
