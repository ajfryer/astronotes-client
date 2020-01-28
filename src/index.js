import React from 'react';
import ReactDOM from 'react-dom';
// configured for Absolute Imports. See jsconfig.json
import App from 'components/App/App';
import { BrowserRouter } from 'react-router-dom';
// base css
import 'normalize.css';
import 'styles/fontLoader.css';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
