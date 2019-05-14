import React from 'react';
import { Helmet } from 'react-helmet';
//
import { MainWrapper, ErrorBoundary } from 'components';
import { routes } from 'routes';

export function Root() {
  return (
    <MainWrapper>
      <Helmet itleTemplate="%s - Notes" defaultTitle="Notes">
        <meta name="description" content="Sample Application" />
      </Helmet>
      <ErrorBoundary>{routes}</ErrorBoundary>
    </MainWrapper>
  );
}

Root.propTypes = {};
