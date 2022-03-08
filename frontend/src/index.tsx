import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import AppComponent from './components/App';
import {Provider} from "react-redux";
import store from './redux/store';
import {ApolloProvider} from "@apollo/client";
import {client as apolloClient} from './apollo/client';

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
