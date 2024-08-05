class TokenService {
  getUser() {
    const token = localStorage.getItem("token");
    return token ? JSON.parse(token) : null;
  }

  updateUser(type, token) {
    const user = this.getUser();
    if (user) {
      if (type === "accessToken") {
        user.accessToken = token;
      } else if (type === "refreshToken") {
        user.refreshToken = token;
      }
      localStorage.setItem("token", JSON.stringify(user));
    }
  }
  setUser(user) {
    localStorage.setItem("token", JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem("token");
  }
}

export default new TokenService();
