import React from "react";
import TodoPage from "./pages/TodoPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./componenets/Navbar";

const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/ToDo" element={<TodoPage />} />
        <Route path="/home" element= {<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
