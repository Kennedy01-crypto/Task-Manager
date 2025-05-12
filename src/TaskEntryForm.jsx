import React from "react";

export const TaskEntryForm = ({ setnewTaskText, addTask, newTaskText }) => {
  return (
    <div>
      <form htmlFor="todo-form" onSubmit={(e) => e.preventDefault()}>
        <h1>To-Do List</h1>
        <input
          type="text"
          id="todo-input"
          placeholder="Enter a new task"
          value={newTaskText}
          onChange={(e) => setnewTaskText(e.target.value)}
        />
        <button type="submit" onClick={addTask}>
          Add Task
        </button>
      </form>
    </div>
  );
};
