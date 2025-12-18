import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Home = () => {
  const navigate = useNavigate()
  const [todos, setTodos] = useState([])

  // 🔽 TILLÄGG: state för rutiner
  const [topHabits, setTopHabits] = useState([])

  // 🔽 TILLÄGG: state för händelser
  const [upcomingEvents, setUpcomingEvents] = useState([])

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || []

    const latestUnfinished = storedTodos
      .filter(todo => !todo.completed)
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 3)

    setTodos(latestUnfinished)
  }, [])

  // 🔽 TILLÄGG: hämta och sortera rutiner
  useEffect(() => {
    const habits = JSON.parse(localStorage.getItem("habits")) || []

    const topThreeHabits = habits
      .sort((a, b) => b.repetitions - a.repetitions)
      .slice(0, 3)

    setTopHabits(topThreeHabits)
  }, [])

  // 🔽 TILLÄGG: hämta och sortera nästkommande händelser
  useEffect(() => {
    const events = JSON.parse(localStorage.getItem("events")) || []

    const nextThreeEvents = events
      .filter(event => new Date(event.date) >= new Date())
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 3)

    setUpcomingEvents(nextThreeEvents)
  }, [])

  return (
    <div>
      <h1>Home Page</h1>

      <h2>Tre Senaste ej utförda ärenden</h2>

      {todos.length === 0 && <p> Ej utförda ärenden </p>}

      <ul>
        {todos.map(todo => (
          <li
            key={todo.id}
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/ToDo")}
          >
            {todo.title}
          </li>
        ))}
      </ul>

      <button onClick={() => navigate("/ToDo")}>
        Visa alla ärenden
      </button>

      <h2> Tre rutiner med högst antal repetitioner</h2>

      {topHabits.length === 0 && <p>Inga rutiner hittades</p>}

      <ul>
        {topHabits.map(habit => (
          <li key={habit.id}>
            {habit.title} – {habit.repetitions} repetitioner
          </li>
        ))}
      </ul>

      <button onClick={() => navigate("/habits")}>
        Visa alla rutiner
      </button>

      <h2>Tre nästkommande händelserna</h2>

      {upcomingEvents.length === 0 && <p>Inga kommande händelser</p>}

      <ul>
        {upcomingEvents.map(event => (
          <li key={event.id}>
            {event.title} – {event.date}
          </li>
        ))}
      </ul>

      <button onClick={() => navigate("/events")}>
        Visa alla händelser
      </button>
    </div>
  )
}

export default Home
