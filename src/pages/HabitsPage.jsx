import { useState, useEffect } from "react";
import "./HabitsPage.css"

export default function HabitsPage() {
  const [habits, setHabits] = useState(JSON.parse( localStorage.getItem("habits"))   || []); 
  
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);
  
  const [newHabit, setNewHabit] = useState("");
  const [priority, setPriority] = useState("låg");

  const [filterPriority, setFilterPriority] = useState("alla");
  const [sortOption, setSortOption] = useState("none");

  function addHabit() {
    if (newHabit.trim() === "") return;

    setHabits([
      ...habits,
      {
        id: Date.now(),
        title: newHabit,
        count: 0,
        priority: priority
      }
    ]);

    setNewHabit("");
    setPriority("låg");
  }

  function removeHabit(id) {
    setHabits(habits.filter(h => h.id !== id));
  }

  function incrementHabit(id) {
    setHabits(
      habits.map(h =>
        h.id === id ? { ...h, count: h.count + 1 } : h
      )
    );
  }

  function decrementHabit(id) {
    setHabits(
      habits.map(h =>
        h.id === id && h.count > 0 ? { ...h, count: h.count - 1 } : h
      )
    );
  }

  function resetHabit(id) {
    setHabits(
      habits.map(h =>
        h.id === id ? { ...h, count: 0 } : h
      )
    );
  }

  function completeHabit(id) {
    setHabits(
      habits.map(h =>
        h.id === id ? { ...h, completed: !h.completed } : h
      )
    );
  }

  let filteredHabits = habits;

  if (filterPriority !== "alla") {
    filteredHabits = filteredHabits.filter(h => h.priority === filterPriority);
  }

  if (sortOption === "count-asc") {
    filteredHabits = filteredHabits.sort((a, b) => a.count - b.count);
  }
  if (sortOption === "count-desc") {
    filteredHabits = filteredHabits.sort((a, b) => b.count - a.count);
  }

  if (sortOption === "priority-asc") {
    const order = ["låg", "mellan", "hög"];
    filteredHabits = filteredHabits.sort(
      (a, b) => order.indexOf(a.priority) - order.indexOf(b.priority)
    );
  }
  if (sortOption === "priority-desc") {
    const order = ["låg", "mellan", "hög"];
    filteredHabits = filteredHabits.sort(
      (a, b) => order.indexOf(b.priority) - order.indexOf(a.priority)
    );
  }

  return (
    <div className="habits-div">
      <h2>Habits</h2>

      <div className="habit-input-row">
        <input
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="Titel på rutin..."
          className="habit-input"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="habit-select"
        >
          <option value="låg">Låg</option>
          <option value="mellan">Mellan</option>
          <option value="hög">Hög</option>
        </select>
        <div className="add-button-div">
          <button onClick={addHabit} className="habit-button">
            Lägg till
          </button>
        </div>
      </div>

      <div className="habit-filter-row">
        <strong>Filter:</strong>
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="habit-select"
        >
          <option value="alla">Alla</option>
          <option value="låg">Låg</option>
          <option value="mellan">Mellan</option>
          <option value="hög">Hög</option>
        </select>

        <strong className="strong-sortera">Sortera:</strong>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="habit-select"
        >
          <option value="none">Ingen</option>
          <option value="count-asc">Reps ↑</option>
          <option value="count-desc">Reps ↓</option>
          <option value="priority-asc">Prioritet ↑</option>
          <option value="priority-desc">Prioritet ↓</option>
        </select>
      </div>

      <ul className="habits-list">
        {filteredHabits.map(habit => (
          <li
            key={habit.id}
            className="habit-item"
          >
            <strong>{habit.title}</strong>
            <div>Repetitioner: {habit.count}</div>
            <div>Prioritet: <strong>{habit.priority}</strong></div>

            <div className="habit-actions">
              <button onClick={() => incrementHabit(habit.id)}
              className="habit-button inc-button"
              >
                +1
              </button>

              <button
                onClick={() => decrementHabit(habit.id)}
                className="habit-button dec-button"
              >
                -1
              </button>

              <button
                onClick={() => resetHabit(habit.id)}
                className="habit-button habit-reset"
              >
                Nollställ
              </button>

              <button
                onClick={() => removeHabit(habit.id)}
                className="habit-button habit-remove"
              >
                Ta bort
              </button>

              <button
                onClick={() => completeHabit(habit.id)}
                style={{
                  marginLeft: "5px",
                  background: habit.completed ? "green" : "#4caf50",
                  color: "white"
                }}
              >
                {habit.completed ? "Ångra" : "Klar"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
