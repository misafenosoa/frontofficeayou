import React, { useState } from "react";
import axios from "axios";
import Footer from "../components/footer/Footer";
import Header, { HeaderBottom } from "../components/header/Header";
import API_BASE_URL from "../Config";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Initialize the useNavigate hook


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const loginData = {
        utilisateur: {
          mail: email,
        },
        mdp: password,
      };

      const response = await axios.post(`${API_BASE_URL}/login`, loginData);

      const { utilisateur, tokenInformation } = response.data;

      // Assuming you have a function to handle authentication (set token in local storage, redirect user, etc.)
      handleAuthentication(tokenInformation.accessToken, utilisateur);

    } catch (error) {
      console.error("Login failed", error);

      // Extract error message from the response and update the state
      if (error.response && error.response.data && error.response.data.errors) {
        setErrorMessage(error.response.data.errors[0]);
      } else {
        setErrorMessage("An error occurred during login");
      }
    }
  };

  const handleAuthentication = (accessToken, user) => {
    // Implement your authentication logic here
    // For example, save the token in local storage and redirect the user
    localStorage.setItem("accessToken", accessToken);
    // Redirect the user to the home page or any other desired page
    // You can use React Router for navigation if you have it set up
    navigate("/")
  };

  return (
    <div className="">
      <Header />
      <HeaderBottom />
      <div class="page-shop u-s-p-t-80">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="login-wrapper">
                <h2 class="account-h2 u-s-m-b-20">Se connecter</h2>
                <form onSubmit={handleLogin}>
                  <div class="u-s-m-b-30">
                    <label className="loglabel">
                      Email
                      <span class="astk">*</span>
                    </label>
                    <input
                      type="text"
                      id="user-name-email"
                      class="text-field"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div class="u-s-m-b-30">
                    <label className="loglabel">
                      Mot de passe
                      <span class="astk">*</span>
                    </label>
                    <input
                      type="password"
                      id="login-password"
                      class="text-field"
                      placeholder="Mot de passe"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {errorMessage && (
                    <div className="error-message">{errorMessage}</div>
                  )}
                  <div class="m-b-45">
                    <button class="button button-outline-secondary w-100">
                      Se connecter
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
