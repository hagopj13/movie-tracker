import React from 'react';
import type { Node } from 'react';

import pageBrokenImage from './pageBroken.png';
import './errorBoundary.scss';

type Props = {
  children: Node,
};

type State = {
  hasError: boolean,
};

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return (
        <div className="imageOverlay">
          <img src={pageBrokenImage} alt="page broken" className="errorImage" />
          <h2 className="errorImageText">Sorry, this page is broken</h2>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
