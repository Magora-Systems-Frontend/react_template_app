const path = require('path');
const fs = require('fs');

export default (req, res) => {

  // get path of index.html
  const filePath = path.resolve('./build/assets/csr-index.html');

  // get html template
  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      return res.status(404).end();
    }

    return res.send(htmlData);
  });
}
