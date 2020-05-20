import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import CardMedia from '@material-ui/core/CardMedia';
import ImageIcon from '@material-ui/icons/Image';

import { MoviePoster } from './MoviePoster';

describe('MoviePoster component', () => {
  let shallow;
  let posterPath;
  let fullPosterPath;
  let wrapper;

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    posterPath = 'pathToPosterImage.png';
    fullPosterPath = 'pathToFullPosterImage.png';
    const mockProps = {
      posterPath,
      fullPosterPath,
    };
    wrapper = shallow(<MoviePoster {...mockProps} />);
  });

  it('should render the MoviePoster component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render CardMedia if fullPosterPath is defined', () => {
    expect(wrapper.exists(CardMedia)).toBe(true);
    expect(wrapper.find(CardMedia).prop('image')).toBe(fullPosterPath);
  });

  it('should render a div containing ImageIcon as media if fullPosterPath is not defined', () => {
    const mockProps = {
      posterPath: null,
      fullPosterPath: null,
    };
    const newWrapper = shallow(<MoviePoster {...mockProps} />);
    expect(newWrapper.exists(CardMedia)).toBe(false);
    expect(newWrapper.exists(ImageIcon)).toBe(true);
  });
});
