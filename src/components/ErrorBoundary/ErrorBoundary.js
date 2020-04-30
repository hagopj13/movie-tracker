import React from 'react';
import type { Node } from 'react';

import ErrorPage from 'pages/ErrorPage/ErrorPage';

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
      return <ErrorPage errorText="Sorry, this page is broken" />;
    }

    return children;
  }
}

export default ErrorBoundary;
