const { SSR_DIRECTION, SSR_DIRECTIONS } = require('../config/constants');

export default (req, res, next) => {

  if (SSR_DIRECTION === SSR_DIRECTIONS.SSR_FOR_ALL) {
    req.isSsrRequest = true;
    return next();
  }

  if (SSR_DIRECTION === SSR_DIRECTIONS.SSR_FOR_BOTS && req.useragent['isBot']) {
    req.isSsrRequest = true;
    return next();
  }

  req.isSsrRequest = false;
  return next();
}
