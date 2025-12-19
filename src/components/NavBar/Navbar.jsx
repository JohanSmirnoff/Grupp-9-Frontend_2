import { Link } from "react-router-dom";
import { useContext } from "react";
import { IdentityPage } from "../../context/IdentityPage";
import "./Navbar.css";

const Navbar = () => {
  const { user } = useContext(IdentityPage);

  return (
    <div className="navbar">
      <h1>Grupp9</h1>
      
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>

        {user && (
          <>
            <li><Link to="/habits">Habits</Link></li>
            <li><Link to="/todo">Todos & Activities</Link></li>
            <li><Link to="/events">Event planner</Link></li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;