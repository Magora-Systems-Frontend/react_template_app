// import React from 'react';
// import ReactDOMServer from 'react-dom/server';

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


    // inject the rendered app into our html and send it

    res.set({
      'Content-Type': 'text/html',
    });

    return res.send(htmlData);
  });
}
