import React from 'react';
import { Helmet } from 'react-helmet';
//
import { MainWrapper } from 'components/MainWrapper';
import { ErrorBoundary } from 'components/ErrorBoundary';
import { routes } from 'routes';

export function Root() {
  return (
    <MainWrapper>
      <Helmet defaultTitle="React template">
        <meta name="description" content="Sample Application" />
      </Helmet>
      <ErrorBoundary>{routes}</ErrorBoundary>
    </MainWrapper>
  );
}

Root.propTypes = {};
