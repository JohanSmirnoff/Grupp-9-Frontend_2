import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import HomePage from './pages/HomePage'
import HabitsPage from './pages/HabitsPage.jsx'

import TodoPage from "./pages/TodoPage";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./componenets/Navbar";

function App() {
// const App = () => {
  return (
    <>
      <Router>
        <nav className="nav-div" style={{ display: "flex", gap: "10px", padding: "10px" }}>
          <Link to="/">Hem</Link>
          <Link to="/habits">Habits</Link>
          <Link to="/ToDo">Todos</Link>
          <Link to="/events">Events</Link>
        </nav>

        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/habits" element={<HabitsPage />} />
          <Route path="/ToDo" element={<TodoPage />} />
          {/* <Route path="/events" element={<HabitsPage />} /> */}
        </Routes>
      </Router>
    </>

      // <BrowserRouter>
      //   <Routes>
      //     <Route path="/ToDo" element={<TodoPage />} />
      //     <Route path="/home" element= {<Home/>}/>
      //   </Routes>
      // </BrowserRouter>
    );
  };

export default App 