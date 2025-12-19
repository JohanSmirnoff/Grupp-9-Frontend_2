import { createContext, useState, useEffect } from "react";

export const IdentityPage = createContext();

const loggedInUser = "authenticed";

export const IdentityPageProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem(loggedInUser));
    if (savedUser) setUser(savedUser);
  }, []);

  const login = (account) => {
    const rightUser = { email: account.email}
    setUser(rightUser);
    localStorage.setItem(loggedInUser, JSON.stringify(rightUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(loggedInUser);
  };

  const appKey = (nameOfApp) => {
    if (!user?.email) return null
    return `${nameOfApp}-${user.email}`
  }

  const loadData = (nameOfApp, noApp = []) => {
    const rightApp = appKey(nameOfApp)
    if (!rightApp) return noApp
    return JSON.parse(localStorage.getItem((rightApp) || noApp))
  }

  const saveData = (nameOfApp, data) => {
    const rightApp = appKey(nameOfApp)
    if (!rightApp) return
    localStorage.setItem(rightApp, JSON.stringify(data))

  }

  return (
    <IdentityPage.Provider value={{ user, login, logout, loadData, saveData }}>
      {children}
    </IdentityPage.Provider>
  );
};