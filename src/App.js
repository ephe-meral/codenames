import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Page, Toolbar, Button } from 'react-onsenui';

function App() {
  return (
          <Ons.Page>
            <Ons.Button onClick={() => ons.notification.alert('Hello world!');}>Tap me!</Ons.Button>
          </Ons.Page>
  );
}

export default App;
