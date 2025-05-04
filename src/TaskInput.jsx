import React from "react";
import { Plus } from "lucide-react";

function TaskInput({ newTaskText, setNewTaskText, handleAddTask }) {
  return (
    <form
      className="min-h-20 color-background-dark
                 flex flex-col items-center justify-start pt-10 px-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleAddTask();
      }}
    >
      <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-8">
        To Do List
      </h1>
      <div className="flex flex-row justify-center">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddTask();
          }}
          aria-label="New task input"
          className="border flex-1 border-primary bg-background-medium text-text-light rounded-lg p-2 mb-4 w-80 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <Plus
          size={30}
          className="border border-primary rounded-2xl m-1.5 cursor-pointer text-primary hover:bg-primary hover:text-background-dark transition"
          onClick={handleAddTask}
          aria-label="Add task button"
        />
      </div>
    </form>
  );
}

export default TaskInput;
