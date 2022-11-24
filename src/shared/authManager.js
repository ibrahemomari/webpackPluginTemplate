const AuthManager = {
  _currentUser: {},

  get currentUser() {
    return AuthManager._currentUser;
  },

  set currentUser(user) {
    AuthManager._currentUser = user;
  },

  enforceLogin() {
    buildfire.auth.getCurrentUser((err, user) => {
      if (!user) {
        buildfire.auth.login({ allowCancel: false }, (err, user) => {
          if (!user) AuthManager.enforceLogin();
          else AuthManager.currentUser = user;
        });
      } else AuthManager.currentUser = user;
    });
  },
  
  refreshCurrentUser() {
    return new Promise((resolve) => {
      buildfire.auth.getCurrentUser((err, user) => {
        AuthManager.currentUser = (err || !user) ? null : user;
        resolve();
      });
    });
  },
};

export default AuthManager;
