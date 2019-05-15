const { reqProfile } = require('./user-profile');
const { ROUTES } = require('../../src/config/constants');
const router = require('express').Router();

router.get(`${ROUTES.USER_PROFILE}/:id`, reqProfile);

module.exports = router;
