import jwtDecode from 'jwt-decode';

export default class Auth {
  static isAuthenticated() {
    const decodedToken = this.getDecodedJwt();

    if (decodedToken) {
      const { exp } = decodedToken;
      const currentTime = Date.now() / 1000;
      return exp > currentTime;
    }
    return false;
  }

  static setToken(token) {
    localStorage.setItem('token', token);
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  static removeToken() {
    localStorage.removeItem('token');
  }

  static getDecodedJwt(payload) {
    const token = this.getToken();
    const t = token || payload;
    let decoded;
    if (payload || token) {
      decoded = jwtDecode(t);
    }
    return decoded;
  }
}
