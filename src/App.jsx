import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import HabitsPage from './pages/HabitsPage.jsx'
import TodoPage from "./pages/TodoPage";
import EventPage from "./pages/EventsPage"
import Navbar from "./components/NavBar/Navbar.jsx";
import Footer from './components/Footer/footer.jsx';

function App() {
  return (
    <>
      <Router>
        <Navbar/>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/habits" element={<HabitsPage />} />
          <Route path="/ToDo" element={<TodoPage />} />
          <Route path="/events" element={<EventPage />} />
        </Routes>

        <Footer />
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