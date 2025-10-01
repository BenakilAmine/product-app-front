'use client';

import React from 'react';
import { Drawer } from 'antd';
import { MobileDrawerProps } from '../../types';

export default function MobileDrawer({ visible, onClose, children }: MobileDrawerProps) {
  return (
    <Drawer
      title="Navigation Admin"
      placement="left"
      onClose={onClose}
      open={visible}
      width={280}
      styles={{ body: { padding: 0 } }}
    >
      {children}
    </Drawer>
  );
}