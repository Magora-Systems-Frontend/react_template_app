import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';

import { Root } from '../../src/pages';

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

    const initialState = {};

    // render the app as a string
    const context = {};

    const componentHTML = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={context}>
        <Root />
      </StaticRouter>
    );

    // inject the rendered app into our html and send it

    res.set({
      'Content-Type': 'text/html',
    });

    let resultHtml = htmlData.replace(
      '<div id="root"></div>',
      `<div id="root">${componentHTML}</div>${'  '}<script>window.REDUX_STATE = ${' '};</script>`
    );

    return res.send(resultHtml);
  });
}
