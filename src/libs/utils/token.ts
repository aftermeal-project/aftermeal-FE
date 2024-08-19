import { LoginResponse } from '../../types/auth';

class Token {
  getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem('token') || '{}');
    return user?.refreshToken;
  }
  getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem('token') || '{}');
    return user?.accessToken;
  }
  getUser() {
    return JSON.parse(localStorage.getItem('token') || '{}');
  }
  setUser(user: LoginResponse) {
    localStorage.setItem('token', JSON.stringify(user));
  }
  removeUser() {
    localStorage.removeItem('token');
  }
}

export default new Token();
