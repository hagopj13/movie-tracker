import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Truncate from 'react-truncate';

import { details as movie } from 'store/fixtures/movie';

import ReviewListItem from './ReviewListItem';

describe('ReviewListItem component', () => {
  let shallow;
  let review;
  let wrapper;

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    [review] = movie.reviews;
    const mockProps = {
      review,
    };
    wrapper = shallow(<ReviewListItem {...mockProps} />);
  });

  it('should render the ReviewListItem component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render Avatar with the first letter of the author', () => {
    expect(wrapper.find(Avatar).text()).toBe(review.author.charAt(0).toUpperCase());
  });

  it('should render the name of the author', () => {
    expect(wrapper.find(Typography).at(0).text()).toBe(review.author);
  });

  it('should render the review content inside Truncate', () => {
    expect(wrapper.exists(Truncate)).toBe(true);
    expect(wrapper.find(Truncate).children().find('span')).toHaveLength(
      review.content.split('\n').length,
    );
    expect(wrapper.find(Truncate).children().find('span').at(0).text()).toBe(
      review.content.split('\n')[0],
    );
  });
});
