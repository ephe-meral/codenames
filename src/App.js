import React, { useState } from 'react';
import './App.css';
import { Page, Tab, Tabbar } from 'react-onsenui';
import { CodeNames } from './components/CodeNames';
import { Average } from './components/Average';

const tabs = [
  ['CodeNames', 'md-view-module', <CodeNames />],
  ['Average', 'md-view-list', <Average />]
];

const App = () => {
  const [tab, setTab] = useState();

  return (
    <Page>
      <Tabbar
        onPreChange={({ index }) => setTab(index)}
        position="bottom"
        index={tab}
        renderTabs={() =>
          tabs.map(([label, icon, component]) => ({
            content: component,
            tab: <Tab label={label} icon={icon} />
          }))
        }
      />
    </Page>
  );
};

export default App;
