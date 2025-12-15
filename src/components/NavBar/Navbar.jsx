import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"
const Navbar = () => {
  return (
    <div className="navbar">
      <h1>Grupp 9 </h1>
      <ul>
        <li>
         <Link to={"/"}> Home </Link>
        </li>
        <li>
         <Link to={"/habits"}>Habits </Link>
        </li>
        <li>
          <Link to={"/ToDo"}>Todos & Activities </Link>
          Habits
        </li>
        <li>
          <Link to={"/events"}>Event planner</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;