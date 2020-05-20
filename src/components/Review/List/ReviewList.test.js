import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import Typography from '@material-ui/core/Typography';

import { details as movie } from 'store/fixtures/movie';

import ReviewList from './ReviewList';
import ReviewListItem from './Item/ReviewListItem';

describe('ReviewList component', () => {
  let shallow;
  let reviews;
  let wrapper;

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    reviews = movie.reviews;
    const mockProps = {
      reviews,
    };
    wrapper = shallow(<ReviewList {...mockProps} />);
  });

  it('should render the ReviewList component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render ReviewsListItem for each review', () => {
    expect(wrapper.find(ReviewListItem)).toHaveLength(reviews.length);
    expect(wrapper.find(ReviewListItem).at(0).prop('review')).toBe(reviews[0]);
  });

  it('should display a text when there are no reviews', () => {
    const mockProps = {
      reviews: [],
    };
    const newWrapper = shallow(<ReviewList {...mockProps} />);
    expect(newWrapper.exists(Typography)).toBe(true);
  });
});
