import { BASE_URL } from "../constants/index.js";
import "../styles/login.css";
import TokenService from "../utils/tokenService.js";

document
  .getElementById("loginForm")
  ?.addEventListener("submit", (event) => login(event));

async function login(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(BASE_URL + "/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      const { data } = await response.json();
      TokenService.setUser(data);
      alert("Login successful.");
      window.location.href = "index.html";
    } else {
      alert("Login failed. Please check your credentials.");
    }
  } catch (error) {
    console.error("Error:", error.response);
    alert("An error occurred during login. Please try again.");
  }
}
