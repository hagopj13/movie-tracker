import React from 'react';

import { mountWithStore } from 'testUtils';
import { dialogTypes } from 'config';
import LoginDialog from 'components/Login/Dialog/LoginDialog';

import { DialogRoot } from './DialogRoot';

describe('DialogRoot component', () => {
  let wrapper;
  const dialogProps = { someProp: 'someValue' };
  let mockHideDialog;

  beforeEach(() => {
    mockHideDialog = jest.fn();
    const mockProps = {
      dialogType: dialogTypes.LOGIN,
      dialogProps,
      onHideDialog: mockHideDialog,
    };
    // using mount because the selected dialog is shown after useEffect runs
    wrapper = mountWithStore(<DialogRoot {...mockProps} />);
  });

  it('should render LoginDialog inside DialogRoot if dialogType is login', () => {
    expect(wrapper.find(LoginDialog)).toHaveLength(1);
  });

  it('should set isOpen prop on the selected dialog to true if it is open', () => {
    expect(wrapper.find(LoginDialog).prop('isOpen')).toBe(true);
  });

  it('should pass dialogProps to the selected dialog', () => {
    expect(wrapper.find(LoginDialog).prop('someProp')).toBe('someValue');
  });

  it('should call the onHideDialog prop when the selected dialog is closed', () => {
    wrapper.find(LoginDialog).prop('onClose')();
    expect(mockHideDialog).toHaveBeenCalled();
  });

  it('should render DialogRoot with no children if no dialogType is specified', () => {
    const mockProps = {
      dialogType: null,
      dialogProps: {},
      onHideDialog: mockHideDialog,
    };
    const newWrapper = mountWithStore(<DialogRoot {...mockProps} />);
    expect(newWrapper.find('DialogRoot').children().exists()).toBe(false);
  });
});