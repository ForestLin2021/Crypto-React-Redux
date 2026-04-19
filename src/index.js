
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // redux state management library, Using Provider to pass the store as an attribute. By passing the store as an attribute in the Provider component, avoiding the store as props. 
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import store from './app/store';

import 'antd/dist/antd.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}> 
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);

