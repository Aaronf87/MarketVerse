import decode from 'jwt-decode';

const AuthService = {
  getUserToken: () => {
    return decode(getToken());
  },

  loggedIn: () => {
    const token = getToken();
    return token && !isTokenExpired(token) ? true : false;
  },

  isTokenExpired: (token) => {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }
    return false;
  },

  getToken: () => {
    return localStorage.getItem('id_token');
  },

  login: (idToken) => {
    localStorage.setItem('id_token', idToken);
  },

  logout: () => {
    localStorage.removeItem('id_token');
  }
};

function getToken() {
  return localStorage.getItem('id_token');
}

function isTokenExpired(token) {
  const decoded = decode(token);
  if (decoded.exp < Date.now() / 1000) {
    localStorage.removeItem('id_token');
    return true;
  }
  return false;
}

export default AuthService;