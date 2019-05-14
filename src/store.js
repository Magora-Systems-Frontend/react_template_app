import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { REDUX_LOGGER_IS_ENABLED } from 'config/constants';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, createMemoryHistory } from 'history';
//
import reduxLoggerMiddleware from 'utils/reduxLoggerMiddleware';
import createReducer from './reducers';

const injectedReducers = {};

export function configureStore(initialState = {}, initUrl = '/') {
  const middleware = [thunk];

  let history = {};
  if (process.env.IS_BROWSER) {
    history = createBrowserHistory();
    middleware.push(routerMiddleware(history));
  } else {
    history = createMemoryHistory({
      initialEntries: [initUrl],
    });
  }
  const enhancers = [];

  if (REDUX_LOGGER_IS_ENABLED) {
    middleware.push(reduxLoggerMiddleware);
  }

  if (process.env.NODE_ENV !== 'production') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
  );

  const store = createStore(createReducer(initialState, { history }), composedEnhancers);

  store.injectedReducers = injectedReducers;

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot && process.env.NODE_ENV !== 'production') {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers, { history }));
    });
  }

  return {
    store,
    history,
  };
}
