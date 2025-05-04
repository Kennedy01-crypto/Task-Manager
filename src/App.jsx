import { useCallback, useState, useEffect } from "react";
import "./App.css";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";

function App() {
  const [newTaskText, setNewTaskText] = useState("");
  const [tasks, setTasks] = useState(() => {
    // Load tasks from localStorage or use default tasks
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks
      ? JSON.parse(savedTasks)
      : [
          { id: 1, text: "Task 1", completed: false },
          { id: 2, text: "Task 2", completed: false },
          { id: 3, text: "Task 3", completed: false },
        ];
  });

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Function to handle adding a new task
  const handleAddTask = useCallback(() => {
    if (newTaskText.trim() !== "") {
      const newTask = {
        id: Date.now(), // Unique ID for the task
        text: newTaskText,
        completed: false,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTaskText("");
    }
  }, [newTaskText]);

  const handleToggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleEditTask = (taskId, newText) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, text: newText } : task
      )
    );
  };

  // Separate tasks into completed and uncompleted
  const uncompletedTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="min-h-screen bg-background-dark text-text-light p-6 max-w-screen-xl text-center">
      <TaskInput
        newTaskText={newTaskText}
        setNewTaskText={setNewTaskText}
        handleAddTask={handleAddTask}
      />
      <div className="flex justify-between mt-6 space-x-4">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-2 text-primary">Tasks</h2>
          <TaskList
            tasks={uncompletedTasks}
            handleToggleTask={handleToggleTask}
            handleDeleteTask={handleDeleteTask}
            handleEditTask={handleEditTask}
          />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-2 text-primary">
            Completed Tasks
          </h2>
          <TaskList
            tasks={completedTasks}
            handleToggleTask={handleToggleTask}
            handleDeleteTask={handleDeleteTask}
            handleEditTask={handleEditTask}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
