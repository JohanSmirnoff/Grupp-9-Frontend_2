import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
 const navigate = useNavigate()
  return (
    <div>
        <h1>Home Page</h1>
      <button onClick={()=>navigate("/ToDo")}>Go to todo</button>
    </div>
  )
}

export default Home
