import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="navbar">
      <h1>Grupp 9 </h1>
      <ul>
        <li>
         
          Home
        </li>
        <li>
   
          Todos & Activities
        </li>
        <li>
       
          Habits
        </li>
        <li>
   
          Event planner
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
