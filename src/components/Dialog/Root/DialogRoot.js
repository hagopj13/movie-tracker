// @flow
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useTheme } from '@material-ui/core/styles';

import LoginDialog from 'components/Auth/Login/Dialog/LoginDialog';
import dialogSelectors from 'store/ui/dialog/dialog.selectors';
import dialogActions from 'store/ui/dialog/dialog.actions';

import DialogTypes from '../types';

const DIALOG_COMPONENTS = {
  [DialogTypes.LOGIN]: LoginDialog,
};

type Props = {
  dialogType: string,
  dialogProps: any,
  onHideDialog: (dialogType: string) => void,
};

const DialogRoot = (props: Props) => {
  const { dialogType, dialogProps, onHideDialog } = props;
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [SelectedDialog, setSelectedDialog] = useState(null);
  const currentDialogType = useRef(null);

  useEffect(() => {
    const showNewDialog = () => {
      setSelectedDialog(dialogType ? DIALOG_COMPONENTS[dialogType] : null);
      currentDialogType.current = dialogType;
      setIsOpen(!!dialogType);
    };

    if (dialogType !== currentDialogType.current) {
      setIsOpen(false);
      if (currentDialogType.current === null) {
        showNewDialog();
      } else {
        const dialogClosingDuration = theme.transitions.duration.leavingScreen + 50;
        setTimeout(showNewDialog, dialogClosingDuration);
      }
    }
  }, [dialogType, theme]);

  const handleHideDialog = useCallback(() => {
    onHideDialog(dialogType);
  }, [dialogType, onHideDialog]);

  if (!SelectedDialog) {
    return null;
  }

  return <SelectedDialog isOpen={isOpen} onClose={handleHideDialog} {...(dialogProps: any)} />;
};

const mapStateToProps = createStructuredSelector({
  dialogType: dialogSelectors.selectDialogType,
  dialogProps: dialogSelectors.selectDialogProps,
});

const mapDispatchToProps = {
  onHideDialog: dialogActions.hideDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogRoot);