import path from 'path';
import express from 'express';
import serverRender from './utils/serverRender';
import clientRender from './utils/clientRender';
import isSsrRequest from './middlewares/isSsrRequest';
const compression = require('compression');
const useragent = require('express-useragent');
const ssrRoutes = require('./routes/root');
const { SSR_DIRECTION, SSR_DIRECTIONS } = require('./config/constants');

const PORT = 8022;
const HOST = '0.0.0.0';
const app = express();
app.disable('x-powered-by');
app.use(compression());

if (SSR_DIRECTION === SSR_DIRECTIONS.SSR_FOR_BOTS) {
  app.use(useragent.express());
}
app.use(isSsrRequest);

const router = express.Router();
router.use('/assets', express.static(path.resolve('./build/assets')));
router.get('/*', (req, res, next) => {
  if(req.isSsrRequest) {
    return serverRender(req, res, next);
  }
  return clientRender(req, res, next);
});

app.use((req, res, next) => {
  if (!req.isSsrRequest) {
    return next();
  }

  return ssrRoutes(req, res, next);
});
app.use(router);

app.listen(PORT, HOST, () => console.log(`Frontend service listening on port: ${PORT}`));
