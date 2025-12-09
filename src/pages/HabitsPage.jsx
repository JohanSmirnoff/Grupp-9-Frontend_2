import { useState } from "react";

export default function HabitsPage() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");

  function addHabit() {
    if (newHabit.trim() === "") return;

    setHabits([
      ...habits,
      {
        id: Date.now(),
        name: newHabit,
        count: 0
      }
    ]);

    setNewHabit("");
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

  return (
    <div style={{ width: "320px", margin: "20px auto", fontFamily: "sans-serif" }}>
      <h2>Habits</h2>

      <div style={{ marginBottom: "10px" }}>
        <input
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="Ny rutin..."
          style={{ width: "200px", padding: "5px" }}
        />
        <button onClick={addHabit} style={{ marginLeft: "5px" }}>
          Lägg till
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {habits.map(habit => (
          <li
            key={habit.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
              padding: "8px",
              background: "#f1f1f1",
              borderRadius: "5px"
            }}
          >
            <div>
              <strong>{habit.name}</strong>
              <div>Reps: {habit.count}</div>
            </div>

            <div>
              <button onClick={() => incrementHabit(habit.id)}>+1</button>
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
