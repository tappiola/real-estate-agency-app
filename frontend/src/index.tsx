import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import AppComponent from './components/App';
import store from './store';
import apolloClient from './apollo/client';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <AppComponent />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
