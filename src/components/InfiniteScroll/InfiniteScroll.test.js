import React from 'react';
import { createMount } from '@material-ui/core/test-utils';

import InfiniteScroll from './InfiniteScroll';

describe('InfiniteScroll component', () => {
  let mount;
  let eventsMap;
  let wrapper;

  const mockScrollCallbackRemove = jest.fn();
  const mockLoadMore = jest.fn();
  const ChildComponent = () => <div>Child component</div>;

  beforeAll(() => {
    mount = createMount();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    eventsMap = new Map();
    global.addEventListener = jest.fn().mockImplementation((event, callback) => {
      eventsMap.set(event, callback);
    });
    global.removeEventListener = jest.fn().mockImplementation((event) => {
      if (event === 'scroll') {
        mockScrollCallbackRemove();
      }
    });
    const mockProps = {
      activationDistance: 0,
      onLoadMore: mockLoadMore,
    };
    wrapper = mount(
      <InfiniteScroll {...mockProps}>
        <ChildComponent />
      </InfiniteScroll>,
    );
  });

  it('should render the InfiniteScroll component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should fire onLoadMore callback when scroll happens and reaches the bottom', () => {
    expect(mockLoadMore).not.toHaveBeenCalled();
    eventsMap.get('scroll')();
    expect(mockLoadMore).toHaveBeenCalledTimes(1);
  });

  it('should not fire onLoadMore callback after scroll happens but does not reach the bottom', () => {
    expect(mockLoadMore).not.toHaveBeenCalled();
    global.innerHeight = -1;
    global.scrollY = 0;
    eventsMap.get('scroll')();
    expect(mockLoadMore).not.toHaveBeenCalled();
  });

  it('should remove the scroll listener when unmounting', () => {
    // Because of how useEffect works, the scroll listener could have already been removed a few times
    const scrollListenerRemovedTimes = mockScrollCallbackRemove.mock.calls.length;
    wrapper.unmount();
    expect(mockScrollCallbackRemove).toHaveBeenCalledTimes(scrollListenerRemovedTimes + 1);
  });
});
