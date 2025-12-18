import { createContext, useState, useEffect } from "react";

export const IdentityPage = createContext();

export const IdentityPageProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (savedUser) setUser(savedUser);
  }, []);

  const login = (account) => {
    setUser(account);
    localStorage.setItem("loggedInUser", JSON.stringify(account));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
  };

  // Uppdatera användarens data (tasks, habits, events)
  const updateUserData = (field, newItem) => {
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const updatedAccounts = accounts.map(acc => {
      if (acc.email === user.email) {
        return { ...acc, [field]: [...acc[field], newItem] };
      }
      return acc;
    });

    localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
    const updatedUser = { ...user, [field]: [...user[field], newItem] };
    login(updatedUser); // uppdatera context
  };

  return (
    <IdentityPage.Provider value={{ user, login, logout, updateUserData }}>
      {children}
    </IdentityPage.Provider>
  );
};