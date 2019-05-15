import path from 'path';
import express from 'express';
import serverRender from './middlewares/serverRender';
const compression = require('compression');
const ssrRoutes = require('./routes/root');

const PORT = 8022;
const HOST = '0.0.0.0';
const app = express();
app.disable('x-powered-by');
app.use(compression());

const router = express.Router();
router.use('/assets', express.static(path.resolve('./build/assets')));
router.get('/*', serverRender);

app.use(ssrRoutes);
app.use(router);

app.listen(PORT, HOST, () => console.log(`Frontend service listening on port: ${PORT}`));
