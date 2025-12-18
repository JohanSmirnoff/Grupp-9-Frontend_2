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

  const [error, setErrore] = useState(null);
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: false,
    time: "",
    category: "",
    deadline: "",
  });

  const AddTask = () => {
    if (
      !task.title ||
      !task.description ||
      !task.time ||
      !task.category ||
      !task.deadline
    ) {
      setErrore("something is wrong");
      return;
    }
    const newTask = {
      ...task,
      id: idGenerator(),
      status: false,
    };

    setTasks([...tasks, newTask]);
    setTask({
      title: "",
      description: "",
      status: false,
      time: "",
      category: "",
      deadline: "",
    });
    setErrore("");
  };

  const deleteTask = (id) => {
    const NewTasks = tasks.filter((task) => task.id != id);

    setTasks(NewTasks);
  };

  const completeTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: !task.status } : task
      )
    );
  };
  useEffect(() => {
    console.log(completeTask);
  });

  if (!user) {
    return <p>Du måste logga in för att se dina todos.</p>;
  }

  return (
    <div>
      <div className="todoContainer">
        <div className="addTask">
          <form action="">
            <input
              type="text"
              value={task.title}
              placeholder="title"
              onChange={(e) => {
                setTask({ ...task, title: e.target.value });
              }}
            />
            <input
              type="text"
              value={task.description}
              placeholder="description"
              onChange={(e) => {
                setTask({ ...task, description: e.target.value });
              }}
            />
            <input
              type="number"
              value={task.time}
              placeholder="Days"
              onChange={(e) =>
                setTask({ ...task, time: Number(e.target.value) })
              }
            />
            <select
              name="select"
              onChange={(e) => setTask({ ...task, category: e.target.value })}
              value={task.category}
            >
              <option value="" disabled hidden>
                choose category...
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
          <button onClick={AddTask}>Add task</button>
          {error && <p>{error}</p>}
        </div>
        <div className="tasksContainer">
          {tasks.length == 0 && <h2>No tasks found</h2>}
          {tasks.length >= 1 &&
            tasks.map((task) => (
              <div
                key={task.id}
                className={`taskCard ${task.status ? "taskCardDone" : ""}  `}
              >
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>{`It takes ${task.time}days`}</p>
               
                <p>{`Category is ${task.category}`}</p>
                <p>{`It should be done ${task.deadline}`}</p>

                <button onClick={() => deleteTask(task.id)}>Delete Task</button>
                <button onClick={() => completeTask(task.id)}>Complete</button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
