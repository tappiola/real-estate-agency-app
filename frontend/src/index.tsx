import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import navigationReducer from "./store/Navigation/navigationReducer";
import userReducer from "./store/User/userReducer";
import {initUser} from "./store/User/actions";
import propertiesReducer from "./store/Properties/propertiesReducer";

const rootReducer = combineReducers({
    navigation: navigationReducer,
    user: userReducer,
    properties: propertiesReducer
    // firebase: firebaseReducer,
    // auth: authReducer
});

export const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk)
));

store.dispatch(initUser());

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
