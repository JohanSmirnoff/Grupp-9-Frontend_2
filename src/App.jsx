import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HabitsPage from './pages/HabitsPage.jsx';
import TodoPage from "./pages/TodoPage";
import EventPage from "./pages/EventsPage";
import Navbar from "./components/Navbar/Navbar.jsx"; 
import SkapaKonto from './pages/skapaKonto/SkapaKonto.jsx';
import { IdentityPageProvider } from "./context/IdentityPage";

function App() {
  return (
    <IdentityPageProvider>
      <Router>
        <nav className="nav-div" style={{ display: "flex", gap: "10px", padding: "10px" }}>
          <Navbar />
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skapa-konto" element={<SkapaKonto />} />
          <Route path="/habits" element={<HabitsPage />} />
          <Route path="/todo" element={<TodoPage />} />
          <Route path="/events" element={<EventPage />} />
        </Routes>
      </Router>
    </IdentityPageProvider>
  );
}

export default App;