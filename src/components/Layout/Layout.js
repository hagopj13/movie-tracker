// @flow
import React from 'react';
import type { Node } from 'react';

import Header from 'components/Header/Header';
import DialogRoot from 'components/Dialog/Root/DialogRoot';

type Props = {
  children: Node,
};

const Layout = (props: Props) => {
  const { children } = props;

  return (
    <>
      <Header />
      <DialogRoot />
      {children}
    </>
  );
};

export default Layout;
