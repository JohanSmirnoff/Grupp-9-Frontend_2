import React, { useEffect, useState, useContext } from "react";
import "./TodoPage.css";
import { v4 as idGenerator } from "uuid";
import { IdentityPage } from "../context/IdentityPage";

const TodoPage = () => {
  const { user, loadData, saveData } = useContext(IdentityPage);

  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [task, setTask] = useState({
    title: "",
    description: "",
    time: "",
    category: "",
    deadline: "",
    status: false,
  });

  const [error, setError] = useState("");

  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("deadline-asc");

  // Load tasks
  useEffect(() => {
    if (!user) return;
    const stored = loadData("todos", []);
    setTasks(Array.isArray(stored) ? stored : []);
  }, [user?.email]);

  // Save tasks
  useEffect(() => {
    if (!user) return;
    saveData("todos", tasks);
  }, [tasks, user?.email]);

  // ---------------------------
  // ADD TASK
  // ---------------------------
  const AddTask = () => {
    if (!task.title || !task.description || !task.time || !task.category || !task.deadline) {
      setError("Something is missing!");
      return;
    }

    const newTask = {
      ...task,
      id: idGenerator(),
      createdAt: Date.now(),
      status: false,
    };

    setTasks([...tasks, newTask]);
    resetForm();
  };

  // ---------------------------
  // START EDIT
  // ---------------------------
  const startEdit = (t) => {
    setEditingId(t.id);
    setTask({
      title: t.title,
      description: t.description,
      time: t.time,
      category: t.category,
      deadline: t.deadline,
      status: t.status,
    });
  };

  // ---------------------------
  // SAVE EDIT
  // ---------------------------
  const saveEdit = () => {
    if (!task.title || !task.description || !task.time || !task.category || !task.deadline) {
      setError("Something is missing!");
      return;
    }

    setTasks(
      tasks.map((t) =>
        t.id === editingId ? { ...t, ...task } : t
      )
    );

    resetForm();
    setEditingId(null);
  };

  // ---------------------------
  // CANCEL EDIT
  // ---------------------------
  const cancelEdit = () => {
    resetForm();
    setEditingId(null);
  };

  // ---------------------------
  // DELETE TASK
  // ---------------------------
  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // ---------------------------
  // COMPLETE TASK
  // ---------------------------
  const completeTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, status: !t.status } : t
      )
    );
  };

  // ---------------------------
  // RESET FORM
  // ---------------------------
  const resetForm = () => {
    setTask({
      title: "",
      description: "",
      time: "",
      category: "",
      deadline: "",
      status: false,
    });
    setError("");
  };

  // ---------------------------
  // FILTERING
  // ---------------------------
  let filteredTasks = tasks.filter((t) => {
    if (filterStatus === "done" && !t.status) return false;
    if (filterStatus === "pending" && t.status) return false;
    if (filterCategory !== "all" && t.category !== filterCategory) return false;
    return true;
  });

  // ---------------------------
  // SORTING
  // ---------------------------
  if (sortBy === "deadline-asc") {
    filteredTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  } else if (sortBy === "deadline-desc") {
    filteredTasks.sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
  } else if (sortBy === "time-asc") {
    filteredTasks.sort((a, b) => a.time - b.time);
  } else if (sortBy === "time-desc") {
    filteredTasks.sort((a, b) => b.time - a.time);
  } else if (sortBy === "status") {
    filteredTasks.sort((a, b) => a.status - b.status);
  }

  if (!user) return <p>You must log in to see your tasks.</p>;

  return (
    <div className="todoContainer">
      <h1>Todos & Activities</h1>

      {/* FORM */}
      <div className="addTask">
        <form>
          <input
            type="text"
            placeholder="Title"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />

          <input
            type="text"
            placeholder="Description"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />

          <input
            type="number"
            placeholder="Days"
            value={task.time}
            onChange={(e) => setTask({ ...task, time: Number(e.target.value) })}
          />

          <select
            value={task.category}
            onChange={(e) => setTask({ ...task, category: e.target.value })}
          >
            <option value="" disabled hidden>Choose category...</option>
            <option value="health">Health</option>
            <option value="household">Household</option>
            <option value="job">Job</option>
          </select>

          <input
            type="date"
            value={task.deadline}
            onChange={(e) => setTask({ ...task, deadline: e.target.value })}
          />
        </form>

        {editingId ? (
          <>
            <button onClick={saveEdit}>Save Changes</button>
            <button onClick={cancelEdit}>Cancel</button>
          </>
        ) : (
          <button onClick={AddTask}>Add Task</button>
        )}

        {error && <p className="error">{error}</p>}
      </div>

      {/* FILTERS */}
      <div className="filters">
        <select onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All</option>
          <option value="done">Completed</option>
          <option value="pending">Not completed</option>
        </select>

        <select onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="all">All categories</option>
          <option value="health">Health</option>
          <option value="household">Household</option>
          <option value="job">Job</option>
        </select>

        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="deadline-asc">Deadline ↑</option>
          <option value="deadline-desc">Deadline ↓</option>
          <option value="time-asc">Time ↑</option>
          <option value="time-desc">Time ↓</option>
          <option value="status">Status</option>
        </select>
      </div>

      {/* TASK LIST */}
      <div className="tasksContainer">
        {filteredTasks.length === 0 && <h2>No tasks found</h2>}

        {filteredTasks.map((t) => (
          <div key={t.id} className={`taskCard ${t.status ? "taskCardDone" : ""}`}>
            <h3>{t.title}</h3>
            <p>{t.description}</p>
            <p>{`It takes ${t.time} days`}</p>
            <p>{`Category: ${t.category}`}</p>
            <p>{`Deadline: ${t.deadline}`}</p>

            <button onClick={() => deleteTask(t.id)}>Delete</button>
            <button onClick={() => completeTask(t.id)}>
              {t.status ? "Undo" : "Complete"}
            </button>
            <button onClick={() => startEdit(t)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoPage;