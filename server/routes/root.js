const { ROUTES } = require('../../src/config/constants');
const router = require('express').Router();

router.get(`${ROUTES.USER_PROFILE}/:id`, require('./user-profile'));

module.exports = router;
