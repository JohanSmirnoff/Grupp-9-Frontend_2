import { useNavigate } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { IdentityPage } from '../../context/IdentityPage'

const TopThree = () => {
  const navigate = useNavigate()
  const [topHabits, setTopHabits] = useState([])
  
  const [latestTodos, setLatestTodos] = useState([])

  const [upcomingEvents, setUpcomingEvents] = useState([])

  const { user, loadData, } = useContext(IdentityPage)

  useEffect(() => {
    if (!user) return;

    const habits = loadData("habits", []) || [];
    const topThreeHabits = [...habits]
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);
    setTopHabits(topThreeHabits);

    const todos = loadData("todos", []) || [];
    const unfinishedTodos = todos.filter(todo => !todo.status);
    const latestUnfinished = unfinishedTodos.slice(-3).reverse();
    setLatestTodos(latestUnfinished);

    const events = loadData("events", []) || [];
    const now = new Date;

    const upcoming = events
    .filter(event => new Date(event.start) > now)
    .sort((eventA, eventB) => new Date(eventA.start) - new Date(eventB.start))
    .slice(0, 3);
    setUpcomingEvents(upcoming)


  }, [user?.email]);

  return (
    <div>
      <h1>Home Page</h1>

      <h2> Tre rutiner med högst antal repetitioner</h2>

      {topHabits.length === 0 && <p>Inga rutiner hittades</p>}

      <ul>
        {topHabits.map(habit => (
          <li key={habit.id}>
            {habit.title} – {habit.count} repetitioner
          </li>
        ))}
      </ul>

      <button onClick={() => navigate("/habits")}>
        Visa alla rutiner
      </button>

      <h2>Tre Senaste ej utförda ärenden</h2>

      {latestTodos.length === 0 && <p> Ej utförda ärenden </p>}

      <ul>
        {latestTodos.map(todo => (
          <li
            key={todo.id}
          >
            {todo.title}
          </li>
        ))}
      </ul>

      <button onClick={() => navigate("/ToDo")}>
        Visa alla ärenden
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

export default TopThree  