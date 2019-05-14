import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import { ServerStyleSheet } from 'styled-components'
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';

import { Root } from '../../src/pages';
import { configureStore } from '../../src/store';

const path = require('path');
const fs = require('fs');

export default (req, res) => {

  const statsFile = path.resolve('./build/assets/loadable-stats.json');

  // point to the html file created by CRA's build tool
  const filePath = path.resolve('./build/assets/index.html');

  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('err', err);
      return res.status(404).end();
    }

    // configure store
    const initialState = {};
    const initUrl = req.path;
    const { store } = configureStore(initialState, initUrl);
    const reduxState = store.getState();
    delete reduxState.router;
    const stringifiedReduxState = JSON.stringify( reduxState ).replace(/</g, '\\u003c'); // because XSS

    // render the app as a string
    const context = {};

    const sheet = new ServerStyleSheet(); // need for getting styled-components tags
    const extractor = new ChunkExtractor({ statsFile, entrypoints: ['app'] }); // extractor for loadable-components

    const componentHTML = ReactDOMServer.renderToString(sheet.collectStyles(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <ChunkExtractorManager extractor={extractor}>
            <Root />
          </ChunkExtractorManager>
        </StaticRouter>
      </Provider>
    ));

    const styleTags = sheet.getStyleTags(); // get styled-components tags

    // get loadable-components tags
    const scriptTags = extractor.getScriptTags();
    const linkTags = extractor.getLinkTags();
    const styleTagsLoadable = extractor.getStyleTags();

    // inject the rendered app into our html and send it

    res.set({
      'Content-Type': 'text/html',
    });

    let resultHtml = htmlData.replace(
      '<div id="root"></div>',
      `<div id="root">${componentHTML}</div>${scriptTags}<script>window.REDUX_STATE = ${stringifiedReduxState};</script>`
    );

    resultHtml = resultHtml.replace(
      '<meta name="head-ssr-replace">',
      `${linkTags}${styleTagsLoadable}${styleTags}`,
    );

    return res.send(resultHtml);
  });
}
