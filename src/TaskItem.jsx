import React, { useState, useRef, useEffect } from "react";
import { Trash2, Edit2, Check } from "lucide-react";

function TaskItem({
  task,
  handleToggleTask,
  handleDeleteTask,
  handleEditTask,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEditSubmit = () => {
    const trimmedText = editText.trim();
    if (trimmedText && trimmedText !== task.text) {
      handleEditTask(task.id, trimmedText);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleEditSubmit();
    } else if (e.key === "Escape") {
      setEditText(task.text);
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-background-medium text-text-light p-5 rounded-xl mb-3 w-full max-w-md sm:max-w-lg mx-auto shadow-md hover:shadow-lg transition-shadow duration-300">
      <label className="flex items-center cursor-pointer space-x-4">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => handleToggleTask(task.id)}
          aria-label={`Mark task "${task.text}" as ${
            task.completed ? "incomplete" : "complete"
          }`}
          className="w-6 h-6 text-primary rounded border-background-light focus:ring-primary focus:ring-2 transition"
        />
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-background-dark text-text-light rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={`Edit task "${task.text}"`}
          />
        ) : (
          <span
            className={
              task.completed
                ? "line-through text-text-medium"
                : "text-text-light"
            }
          >
            {task.text}
          </span>
        )}
      </label>
      <div className="flex space-x-2 mt-2">
        {isEditing ? (
          <button
            type="button"
            onClick={handleEditSubmit}
            className="text-success hover:text-success-light transition p-2 rounded focus:outline-none focus:ring-2 focus:ring-success"
            aria-label={`Save task "${task.text}"`}
          >
            <Check size={22} />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="text-warning hover:text-warning-light transition p-2 rounded focus:outline-none focus:ring-2 focus:ring-warning"
            aria-label={`Edit task "${task.text}"`}
          >
            <Edit2 size={22} />
          </button>
        )}
        <button
          type="button"
          className="text-danger hover:text-danger-light transition p-2 rounded focus:outline-none focus:ring-2 focus:ring-danger"
          aria-label={`Delete task "${task.text}"`}
          onClick={() => handleDeleteTask(task.id)}
        >
          <Trash2 size={22} />
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
