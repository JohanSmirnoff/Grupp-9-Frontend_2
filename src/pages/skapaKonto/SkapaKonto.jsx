import { useEffect, useState } from "react";
import "./SkapaKonto.css";

const SkapaKonto = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [account, setAccount] = useState(null);

  const HandlerEmail = (e) => setEmail(e.target.value);
  const HandlerPassword = (e) => setPassword(e.target.value);

  const HandlerReg = () => {
    if (!email || !password) return;

   const newAccount = { 
  email, 
  password, 
  tasks: [], 
 
};

    const savedAccounts = JSON.parse(localStorage.getItem("accounts")) || [];

    const exists = savedAccounts.some((acc) => acc.email === email);
    if (exists) {
      alert("Det finns redan ett konto med denna email!");
      return;
    }

    savedAccounts.push(newAccount);
    localStorage.setItem("accounts", JSON.stringify(savedAccounts));

    setAccount(newAccount);
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    console.log("Aktuellt konto:", account);
  }, [account]);

  return (
    <div className="konto-container">
      <h1>Skapa Konto</h1>
      <div className="input-box">
        <input
          type="email"
          onChange={HandlerEmail}
          value={email}
          placeholder="skriv din email"
        />
        <input
          type="password"
          onChange={HandlerPassword}
          value={password}
          placeholder="skriv ditt lösenord"
        />
        <button onClick={HandlerReg}>Registrera</button>
      </div>
      <h3>{account?.email ? `Konto skapat för ${account.email}` : ""}</h3>
    </div>
  );
};

export default SkapaKonto;