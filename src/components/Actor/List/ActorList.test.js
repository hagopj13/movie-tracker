import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import { details as movieDetails } from 'store/fixtures/movie';

import { ActorList } from './ActorList';
import ActorListItem from './Item/ActorListItem';

describe('ActorList component', () => {
  let shallow;
  let actors;
  let wrapper;

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    actors = movieDetails.actors;
    const mockProps = {
      actors,
    };
    wrapper = shallow(<ActorList {...mockProps} />);
  });

  it('should render the ActorList component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the actors as a list of ActorListItem', () => {
    expect(wrapper.find(ActorListItem)).toHaveLength(actors.length);
  });

  it('should render a text stating there are no actors if the actors prop is an empty array', () => {
    const mockProps = {
      actors: [],
    };
    const newWrapper = shallow(<ActorList {...mockProps} />);
    expect(newWrapper.text()).toBe('No actors found');
  });
});
