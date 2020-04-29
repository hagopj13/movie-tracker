// @flow
import React, { useState } from 'react';
import type { Node } from 'react';

import Header from 'components/Header/Header';
import Drawer from 'components/Drawer/Drawer';
import DialogRoot from 'components/Dialog/Root/DialogRoot';

type Props = {
  children: Node,
};

const Layout = (props: Props) => {
  const { children } = props;

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <Header onOpenDrawer={handleOpenDrawer} />
      <Drawer isOpen={isDrawerOpen} onClose={handleCloseDrawer} />
      <DialogRoot />
      {children}
    </>
  );
};

export default Layout;
