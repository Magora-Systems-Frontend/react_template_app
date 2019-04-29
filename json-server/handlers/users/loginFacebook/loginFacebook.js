// const { OAuth2Client } = require('google-auth-library');
// const consts = require('../../../config/consts');

const userLoginGoogle = async (req, res) => {
  const { accessToken, userID, ...body } = req.body;

  // access token and userID should be verified

  return res.status(200).send({
    status: 200,
    data: {
      accessToken: 'trueAccessToken',
      refreshToken: 'trueRefreshToken',
      userInfo: {
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        avatarUrl: body.avatarUrl,
      },
    },
  });

};

module.exports = userLoginGoogle;
