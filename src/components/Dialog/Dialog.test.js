import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import MuiDialog from '@material-ui/core/Dialog';

import Dialog from './Dialog';
import DialogTitle from './Title/DialogTitle';

describe('Dialog component', () => {
  let shallow;
  const isOpen = true;
  const title = 'Some title';
  const FakeDialogContent = () => <div>Dialog content</div>;
  let mockClose;
  let wrapper;

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    mockClose = jest.fn();
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
    expect(mockClose).toHaveBeenCalled();
  });
});
