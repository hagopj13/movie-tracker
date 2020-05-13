import React from 'react';
import { shallow } from 'enzyme';

import { details as movieDetails } from 'store/fixtures/movie';

import { ActorList } from './ActorList';
import ActorListItem from './Item/ActorListItem';

describe('ActorList component', () => {
  let actors;
  let wrapper;

  beforeEach(() => {
    actors = movieDetails.actors;
    const mockProps = {
      actors,
    };

    wrapper = shallow(<ActorList {...mockProps} />);
  });

  it('should render ActorList component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the actors as a list of ActorListItem', () => {
    expect(wrapper.find(ActorListItem)).toHaveLength(actors.length);
  });

  it('should render a text stating there are no actors if the actors prop is an empty array', () => {
    const mockProps = {
      actors: [],
    };
    wrapper = shallow(<ActorList {...mockProps} />);
    expect(wrapper.text()).toBe('No actors found');
  });
});
