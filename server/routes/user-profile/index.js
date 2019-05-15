import { nodeFetch } from '../../utils/fetch';
const { API_METHODS } = require('../../../src/config/constants');
const { API_URL } = require('../../config/constants');

export const reqProfile = async (req, res, next) => {
  const prevInitialState = req.reduxInitialState || {};

  const { id: userId } = req.params;
  const getUserUrl = `${API_URL}${API_METHODS.USERS}/${userId}`;
  const response = await nodeFetch({ url: getUserUrl });

  req.reduxInitialState = {
    ...prevInitialState,
    userState: {
      payload: {
        ...response,
      }
    },
  };

  next();
};
