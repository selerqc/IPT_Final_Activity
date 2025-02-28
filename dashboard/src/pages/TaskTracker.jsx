import { useState } from "react";
import "../styles/TaskTracker.css";

import Sidebar from "./Sidebar";
import { ToastContainer, toast } from "react-toastify";

function TaskTracker() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [error, setError] = useState("");

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask("");
      toast.success("Task Added!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
      });
    } else {
      const errorMessage = "Please enter a task";
      setError(errorMessage);
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
      });
    }
  };

  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
    toast.info("Task removed", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      // transition: Bounce,
    });
  };

  return (
    <div className="task-tracker">
      <h1>Task Tracker</h1>
      <div className="input-container">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
        />

        <button onClick={addTask}>Add Task</button>
      </div>
      {error && <ToastContainer />}
      <ul>
        {tasks.map((t, index) => (
          <li key={index} className={t.completed ? "completed" : ""}>
            <span>{t.text}</span>
            <div className="buttons">
              <button onClick={() => toggleComplete(index)}>Toggle</button>
              <button onClick={() => removeTask(index)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <Sidebar />
    </div>
  );
}

export default TaskTracker;
