import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HabitsPage from './pages/HabitsPage.jsx';
import TodoPage from "./pages/TodoPage";
import EventPage from "./pages/EventsPage"
import Navbar from "./components/NavBar/Navbar.jsx";
import Footer from './components/Footer/footer.jsx';
import EventPage from "./pages/EventsPage"; 
import SkapaKonto from './pages/skapaKonto/SkapaKonto.jsx';
import { IdentityPageProvider } from "./context/IdentityPage";

function App() {
  return (
    <IdentityPageProvider>
      <Router>
        <Navbar/>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skapa-konto" element={<SkapaKonto />} />
          <Route path="/habits" element={<HabitsPage />} />
          <Route path="/todo" element={<TodoPage />} />
          <Route path="/events" element={<EventPage />} />
        </Routes>

        <Footer />
      </Router>
    </IdentityPageProvider>
  );
}

export default App;