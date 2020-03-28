import { createStore } from "redux";
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Container from './components/containers/container';
import RootReducer from "./reducers/root-reducer";

const store = createStore(RootReducer);

ReactDOM.render(
  <Provider store={store}>
    <Container />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.register();
