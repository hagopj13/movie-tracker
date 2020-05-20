import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import MuiDialog from '@material-ui/core/Dialog';

import Dialog from './Dialog';
import DialogTitle from './Title/DialogTitle';

describe('Dialog component', () => {
  let shallow;
  let isOpen;
  let title;
  let wrapper;

  const FakeDialogContent = () => <div>Dialog content</div>;
  const mockClose = jest.fn();

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    isOpen = true;
    title = 'Some title';
    const mockProps = {
      isOpen,
      title,
      onClose: mockClose,
    };
    wrapper = shallow(
      <Dialog {...mockProps}>
        <FakeDialogContent />
      </Dialog>,
    );
  });

  it('should render the Dialog component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the child component', () => {
    expect(wrapper.exists(FakeDialogContent)).toBe(true);
  });

  it('should pass isOpen as a prop to MuiDialog', () => {
    expect(wrapper.find(MuiDialog).prop('open')).toBe(isOpen);
  });

  it('should pass title as a prop to DialogTitle', () => {
    expect(wrapper.find(DialogTitle).prop('title')).toBe(title);
  });

  it('should call onClose when onClose of MuiDialog is triggered', () => {
    wrapper.find(MuiDialog).prop('onClose')();
    expect(mockClose).toHaveBeenCalledTimes(1);
  });
});
