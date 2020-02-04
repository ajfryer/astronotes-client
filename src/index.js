// core dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// custom components
import App from 'components/App/App';

// global static styling
import 'normalize.css';
import 'styles/fontLoader.css';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
