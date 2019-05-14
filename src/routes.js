import React from 'react';
import loadable from '@loadable/component';
import { Route, Switch } from 'react-router-dom';
import { ROUTES } from 'config/constants';
// pages
import {
  App,
  HomePage,
  NotFoundPage,
  // PasswordSetPage,
  RegistrationFormPage,
  UserProfilePage,
  UserProfileEditPage,
} from 'pages';
//

// import PasswordSetPage from './pages/PasswordSetPage';

const PasswordSetPage = loadable(() => import(/* webpackPrefetch: true */ './pages/PasswordSetPage'));

export const routes = (
  <Switch>
    <Route
      exact
      path={ROUTES.HOME_PAGE}
      render={(props) => (
        <App>
          <HomePage {...props} />
        </App>
      )}
    />
    <Route
      exact
      path={ROUTES.ADMIN_PANEL}
      render={(props) => (
        <App>
          <NotFoundPage {...props} />
        </App>
      )}
    />
    <Route
      exact
      path={ROUTES.REGISTRATION_FORM}
      render={(props) => (
        <App>
          <RegistrationFormPage {...props} />
        </App>
      )}
    />
    <Route
      exact
      path={ROUTES.PASSWORD_SET_FORM}
      render={(props) => (
        <App>
          <PasswordSetPage {...props} />
        </App>
      )}
    />
    <Route
      exact
      path={`${ROUTES.USER_PROFILE}/:id`}
      render={(props) => (
        <App>
          <UserProfilePage {...props} />
        </App>
      )}
    />
    <Route
      exact
      path={`${ROUTES.USER_PROFILE}/:id/edit`}
      render={(props) => (
        <App>
          <UserProfileEditPage {...props} />
        </App>
      )}
    />
    <Route
      render={(props) => (
        <App>
          <NotFoundPage {...props} />
        </App>
      )}
    />
  </Switch>
);
