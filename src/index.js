import React from 'react';
import ReactDOM from 'react-dom';
import { loadableReady } from '@loadable/component';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
//
import { NODE_ENV, API_URL, API_VERSION } from 'config/constants';
import { Root } from 'pages';
import * as axiosClient from 'utils/api/axiosClient';
import { googleAuthInit } from 'utils/googleAuth';
import { facebookAuthInit } from 'utils/facebookAuth';
import { configureStore } from './store';

import 'antd/dist/antd.css';
import './styles/app.scss';

const MOUNT_NODE = document.getElementById('root');

if (NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept();
  }
}

let initialState = {};
// if (window && window.REDUX_STATE) {
//   initialState = window.REDUX_STATE;
//   delete window.REDUX_STATE;
// }
const { store, history } = configureStore(initialState);

window.onload = () => {
  googleAuthInit();
  facebookAuthInit();
};
axiosClient.init({ store, API_URL, API_VERSION });

loadableReady(() => {
  ReactDOM.hydrate(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Root />
      </ConnectedRouter>
    </Provider>,
    MOUNT_NODE
  );
});
