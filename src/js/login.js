import { loginApi } from "../libs/api/auth.js";
import "../styles/login.css";
import tokenService from "../utils/tokenService.js";

document
  .getElementById("loginForm")
  ?.addEventListener("submit", (event) => login(event));

async function login(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await loginApi(email, password);
    tokenService.setUser(response?.data);
    alert("Login successful.");
    window.location.href = "index.html";
  } catch (error) {
    if (error?.response?.status === 404) {
      alert("Login failed. Please check your credentials.");
    } else {
      alert("An error occurred during login. Please try again.");
    }
  }
}
