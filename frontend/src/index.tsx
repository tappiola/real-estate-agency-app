import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {Provider} from "react-redux";
// import {initUser} from "./store/User/actions";
import store from './store';

// store.dispatch(initUser());

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
