import React from "react";
import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  handleToggleTask,
  handleDeleteTask,
  handleEditTask,
}) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-4 px-2 sm:px-4 max-w-full sm:max-w-lg mx-auto">
      {tasks.length === 0 ? (
        <p className="text-text-light text-lg mt-4">
          No tasks available. <br /> Add a new task!
        </p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            handleToggleTask={handleToggleTask}
            handleDeleteTask={handleDeleteTask}
            handleEditTask={handleEditTask}
          />
        ))
      )}
    </div>
  );
}

export default TaskList;
