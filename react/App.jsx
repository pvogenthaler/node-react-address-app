import React from 'react';
import ReactDOM from 'react-dom';
import AddressPage from './pages/AddressPage';

const App = () => (
  <AddressPage />
);

ReactDOM.render(
  <App />,
  document.getElementById('react-root')
);
