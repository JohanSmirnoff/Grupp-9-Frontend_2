import React, { useEffect, useState } from "react";
import "./TodoPage.css";
import { v4 as idGenerator } from "uuid";
const TodoPage = () => {
  const [tasks, setTasks] = useState(JSON.parse( localStorage.getItem("todos")) || []);

useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(tasks));
}, [tasks]);


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
