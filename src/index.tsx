import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalContext, { globalContext } from 'src/context'
ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);
