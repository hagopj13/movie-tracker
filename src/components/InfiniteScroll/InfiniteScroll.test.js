import React from 'react';
import { createMount } from '@material-ui/core/test-utils';

import InfiniteScroll from './InfiniteScroll';

describe('InfiniteScroll component', () => {
  let mount;
  const SomeComponent = () => <div>Some component</div>;
  let mockScrollCallbackRemove;
  let mockLoadMore;
  let wrapper;

  beforeAll(() => {
    mount = createMount();
  });

  const eventsMap = new Map();

  beforeEach(() => {
    mockScrollCallbackRemove = jest.fn();
    global.addEventListener = jest.fn().mockImplementation((event, callback) => {
      eventsMap.set(event, callback);
    });
    global.removeEventListener = jest.fn().mockImplementation((event) => {
      if (event === 'scroll') {
        mockScrollCallbackRemove();
      }
    });
    mockLoadMore = jest.fn();
    const mockProps = {
      activationDistance: 0,
      onLoadMore: mockLoadMore,
    };
    wrapper = mount(
      <InfiniteScroll {...mockProps}>
        <SomeComponent />
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
