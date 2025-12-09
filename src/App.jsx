import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import HomePage from './pages/HomePage'
import HabitsPage from './pages/HabitsPage.jsx'

function App() {

  return (
    <>
      <Router>
        <nav style={{ display: "flex", gap: "10px", padding: "10px" }}>
          <Link to="/">Hem</Link>
          <Link to="/habits">Habits</Link>
          <Link to="/todos">Todos</Link>
          <Link to="/events">Events</Link>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/habits" element={<HabitsPage />} />
          {/* <Route path="/todos" element={<HabitsPage />} />
          <Route path="/events" element={<HabitsPage />} /> */}
        </Routes>
      </Router>
    </>
  )
}

export default App 
