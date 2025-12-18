import React, { useEffect, useState, useContext } from "react";
import "./TodoPage.css";
import { v4 as idGenerator } from "uuid";
import { IdentityPage } from "../context/IdentityPage";

const TodoPage = () => {

  const { user, loadData, saveData } = useContext(IdentityPage)

  const [tasks, setTasks] = useState(() => {
    const storedData = loadData("todos", []);
    return Array.isArray(storedData) ? storedData : [];
  });
  
useEffect(() => {
    if (!user) return;
    const storedData = loadData("todos", []);
    setTasks(Array.isArray(storedData) ? storedData : []);
  }, [user?.email]);

useEffect(() => {
    if (!user) return;
    saveData("todos", tasks);
  }, [tasks, user?.email]);

  const [error, setError] = useState(null);
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: false,
    time: "",
    category: "",
    deadline: "",
  });

  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("deadline-asc");

  const AddTask = () => {
    if (!task.title || !task.description || !task.time || !task.category || !task.deadline) {
      setError("Something is missing!");
      return;
    }
    const newTask = { ...task, id: idGenerator(), status: false };
    setTasks([...tasks, newTask]);
    setTask({ title: "", description: "", status: false, time: "", category: "", deadline: "" });
    setError("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const completeTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: !task.status } : task
      )
    );
  };


  let filteredTasks = tasks.filter((t) => {
    if (filterStatus === "done" && !t.status) return false;
    if (filterStatus === "pending" && t.status) return false;
    if (filterCategory !== "all" && t.category !== filterCategory) return false;
    return true;
  });

  // 🔹 Sortering
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

  useEffect(() => {
    console.log(completeTask);
  });

  if (!user) {
    return <p>Du måste logga in för att se dina todos.</p>;
  }

  return (
    <div className="todoContainer">
      <h1>Todos & Activities</h1>

      
      <div className="addTask">
        <form>
          <input
            type="text"
            value={task.title}
            placeholder="Title"
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />
          <input
            type="text"
            value={task.description}
            placeholder="Description"
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />
          <input
            type="number"
            value={task.time}
            placeholder="Days"
            onChange={(e) => setTask({ ...task, time: Number(e.target.value) })}
          />
          <select
            onChange={(e) => setTask({ ...task, category: e.target.value })}
            value={task.category}
          >
            <option value="" disabled hidden>
              Choose category...
            </option>
            <option value="health">Health</option>
            <option value="household">Household</option>
            <option value="job">Job</option>
          </select>
          <input
            type="date"
            onChange={(e) => setTask({ ...task, deadline: e.target.value })}
            value={task.deadline}
          />
        </form>
        <button onClick={AddTask}>Add Task</button>
        {error && <p className="error">{error}</p>}
      </div>

     
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

    
      <div className="tasksContainer">
        {filteredTasks.length === 0 && <h2>No tasks found</h2>}
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`taskCard ${task.status ? "taskCardDone" : ""}`}
          >
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>{`It takes ${task.time} days`}</p>
            <p>{`Category: ${task.category}`}</p>
            <p>{`Deadline: ${task.deadline}`}</p>

            <button onClick={() => deleteTask(task.id)}>Delete</button>
            <button onClick={() => completeTask(task.id)}>
              {task.status ? "Undo" : "Complete"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoPage;
