import { useCallback, useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { TaskEntryForm } from "./TaskEntryForm";
import "./App.css";
import { TaskDisplay } from "./TaskDisplay";

function App() {
  const [newTaskText, setnewTaskText] = useState("");

  const [tasks, setTasks] = useState(() => {
    // load tasks from localstorage or use default tasks
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks
      ? JSON.parse(savedTasks)
      : [
          { id: 1, text: "Task 1", completed: false, isEditing: false },
          { id: 2, text: "Task 2", completed: false, isEditing: false },
          { id: 3, text: "Task 3", completed: false, isEditing: false },
        ];
  });

  // save tasks to localstorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Function to handle adding a new task
  const addTask = useCallback(() => {
    if (newTaskText.trim() !== "") {
      const newTask = {
        id: Date.now(),
        text: newTaskText,
        completed: false,
        isEditing: false,
      };
      setTasks((previousTasks) => [...previousTasks, newTask]);
      setnewTaskText("");
    }
  }, [newTaskText]);

  const deleteTask = (taskId) => {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== taskId)
    );
  };

  const toggleEditTask = (taskId) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId ? { ...task, isEditing: !task.isEditing } : task
      )
    );
  };

  const editTask = (taskId, newText) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId ? { ...task, text: newText, isEditing: false } : task
      )
    );
  };

  return (
    <>
      <div className="app">
        <TaskEntryForm
          setnewTaskText={setnewTaskText}
          addTask={addTask}
          newTaskText={newTaskText}
        />
        <TaskDisplay
          tasks={tasks}
          deleteTask={deleteTask}
          toggleEditTask={toggleEditTask}
          editTask={editTask}
        />
      </div>
    </>
  );
}

export default App;
