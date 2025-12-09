import { useState } from "react";

export default function HabitsPage() {
  const [habits, setHabits] = useState([]);

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
    <div style={{ width: "340px", margin: "20px auto", fontFamily: "sans-serif" }}>
      <h2>Habits</h2>

      <div style={{ marginBottom: "10px" }}>
        <input
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="Titel på rutin..."
          style={{ width: "200px", padding: "5px" }}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{ marginLeft: "5px", padding: "5px" }}
        >
          <option value="låg">Låg</option>
          <option value="mellan">Mellan</option>
          <option value="hög">Hög</option>
        </select>

        <button onClick={addHabit} style={{ marginLeft: "5px" }}>
          Lägg till
        </button>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <strong>Filter:</strong>
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          style={{ marginLeft: "5px" }}
        >
          <option value="alla">Alla</option>
          <option value="låg">Låg</option>
          <option value="mellan">Mellan</option>
          <option value="hög">Hög</option>
        </select>

        <strong style={{ marginLeft: "10px" }}>Sortera:</strong>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          style={{ marginLeft: "5px" }}
        >
          <option value="none">Ingen</option>
          <option value="count-asc">Reps ↑</option>
          <option value="count-desc">Reps ↓</option>
          <option value="priority-asc">Prioritet ↑</option>
          <option value="priority-desc">Prioritet ↓</option>
        </select>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredHabits.map(habit => (
          <li
            key={habit.id}
            style={{
              marginBottom: "8px",
              padding: "10px",
              background: "#f1f1f1",
              borderRadius: "5px"
            }}
          >
            <strong>{habit.title}</strong>
            <div>Repetitioner: {habit.count}</div>
            <div>Prioritet: <strong>{habit.priority}</strong></div>

            <div style={{ marginTop: "5px" }}>
              <button onClick={() => incrementHabit(habit.id)}>+1</button>

              <button
                onClick={() => decrementHabit(habit.id)}
                style={{ marginLeft: "5px" }}
              >
                -1
              </button>

              <button
                onClick={() => resetHabit(habit.id)}
                style={{ marginLeft: "5px", background: "#ddd" }}
              >
                Nollställ
              </button>

              <button
                onClick={() => removeHabit(habit.id)}
                style={{ marginLeft: "5px", background: "red", color: "white" }}
              >
                Ta bort
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
