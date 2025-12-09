import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import HomePage from './pages/HomePage'

function App() {

  return (
    <>
      <Router>
        <Link to="/"> </Link>
        <Routes>
          <Route path="/"  element={<HomePage />} />
          <Route></Route>
          <Route></Route>
        </Routes>
      </Router>

    </>
  )
}

export default App
