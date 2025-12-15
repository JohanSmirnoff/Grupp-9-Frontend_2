import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import HabitsPage from './pages/HabitsPage.jsx'
import TodoPage from "./pages/TodoPage";
import EventPage from "./pages/EventsPage"
import Navbar from "./components/NavBar/Navbar.jsx";

function App() {
  return (
    <>
      <Router>
        <nav className="nav-div" style={{ display: "flex", gap: "10px", padding: "10px" }}>
          <Navbar/>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/habits" element={<HabitsPage />} />
          <Route path="/ToDo" element={<TodoPage />} />
          <Route path="/events" element={<EventPage />} />
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