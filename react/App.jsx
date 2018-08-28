import React from 'react';
import ReactDOM from 'react-dom';
import Addresses from './pages/Addresses';

const App = () => (
  <Addresses />
);

ReactDOM.render(
  <App />,
  document.getElementById('react-root')
);
