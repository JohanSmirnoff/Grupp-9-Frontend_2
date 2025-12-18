import React, { useState, useContext } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { IdentityPage } from "../../context/IdentityPage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showText, setshowText] = useState("");

  const { user, login, logout } = useContext(IdentityPage);

  const LoginHandler = async () => {
    if (!email || !password) {
      setError("Du måste skriva både email och lösenord");
      return;
    }

    const savedAccounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const foundAccount = savedAccounts.find(
      (acc) => acc.email === email && acc.password === password
    );

    if (foundAccount) {
      setError("");
      login(foundAccount);

      try {
        const res = await fetch("https://dummyjson.com/quotes/random");
        const data = await res.json();
        setshowText(data.quote);
        console.log(data.quote)
      } catch (err) {
       setshowText("Kunde inte hämta citat just nu.");
      }
    } else {
      setError("Fel email eller lösenord");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="inloggning-container">
      <h1>Inloggning</h1>
      <div className="input-box">
        <input
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={LoginHandler}>Login</button>
        <button onClick={logout}>Logga ut</button>
        <Link to="/skapa-konto">Skapa konto</Link>
      </div>
      <h4 className="Error">{error}</h4>

      {user && (
        <>
          <h3>Välkommen {user.email}</h3>
          <p className="random-text"><i>{showText}</i></p>
        </>
      )}
    </div>
  );
};

export default Login;