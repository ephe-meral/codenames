import React from 'react';
import { Page, Toolbar } from 'react-onsenui';

const TabPage = ({ children, label, leftButton = null, rightButton = null }) => (
  <Page
    renderToolbar={() => (
      <Toolbar>
        <div className="left">{leftButton}</div>
        <div css="font-weight: bold;" className="center">
          {label}
        </div>
        <div className="right">{rightButton}</div>
      </Toolbar>
    )}
    contentStyle={{ padding: '1em' }}
  >
    {children}
  </Page>
);

export { TabPage };
