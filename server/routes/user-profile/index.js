module.exports = (req, res, next) => {
  const prevInitialState = req.reduxInitialState;
  req.reduxInitialState = {

    userState: {
      payload: {
        id: "e36fdb10-6b38-11e9-a15c-c95eeb7cf1d5",
        email: "test@email.com",
        firstName: "Semen",
        lastName: "Semenovich",
        avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
        city: "Tagiiiiiiiil",
        username: "SEMA",
      }
    },
  };

  next();
};
