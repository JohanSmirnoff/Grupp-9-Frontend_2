import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"
const Navbar = () => {
  return (
    <div className="navbar">
      <h1>Grupp 9 </h1>
      <ul>
        <li>
         <Link to={"/home"}> Home </Link>
     
        </li>
        <li>
         <Link to={"/ToDo"}>Todos & Activities </Link>
   
          
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
