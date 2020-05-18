// @flow
import React from 'react';
import type { Node } from 'react';
import MuiDialog from '@material-ui/core/Dialog';

import DialogTitle from './Title/DialogTitle';

type Props = {
  isOpen: boolean,
  title: string,
  children: Node,
  onClose: () => void,
  ...
};

const Dialog = (props: Props) => {
  const { isOpen, title, onClose, children, ...dialogProps } = props;

  return (
    <MuiDialog open={isOpen} onClose={onClose} disableRestoreFocus {...(dialogProps: any)}>
      <DialogTitle title={title} onClose={onClose} />
      {children}
    </MuiDialog>
  );
};

export default Dialog;
