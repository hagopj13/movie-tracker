import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import ImageIcon from '@material-ui/icons/Image';

import { ActorListItem } from './ActorListItem';

describe('ActorListItem component', () => {
  let shallow;
  let actor;
  let fullProfilePath;
  let wrapper;

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    actor = {
      id: 'someId',
      name: 'Some name',
      character: 'Some character',
      profilePath: 'pathToProfileImage.png',
    };
    fullProfilePath = 'fullPathToProfileImage.png';
    const mockProps = {
      actor,
      fullProfilePath,
    };
    wrapper = shallow(<ActorListItem {...mockProps} />);
  });

  it('should render the ActorListItem component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render CardMedia if fullProfilePath is defined', () => {
    expect(wrapper.exists(CardMedia)).toBe(true);
    expect(wrapper.find(CardMedia).prop('image')).toBe(fullProfilePath);
  });

  it('should render a div containing ImageIcon as media if fullProfilePath is not defined', () => {
    const mockProps = {
      actor,
      fullProfilePath: null,
    };
    const newWrapper = shallow(<ActorListItem {...mockProps} />);
    expect(newWrapper.exists(CardMedia)).toBe(false);
    expect(newWrapper.exists(ImageIcon)).toBe(true);
  });

  it('should render actor name in CardContent', () => {
    expect(wrapper.find(CardContent).childAt(0).text()).toBe(actor.name);
  });

  it('should render character name in CardContent', () => {
    expect(wrapper.find(CardContent).childAt(1).text()).toBe(actor.character);
  });
});
