import React from "react";
import { TaskListItem } from "./TaskListItem";

export const TaskDisplay = ({
  tasks,
  deleteTask,
  toggleEditTask,
  editTask,
}) => {
  const taskActions = { deleteTask, toggleEditTask, editTask };
  return (
    <div>
      <ul id="todo-list">
        {tasks.map((task) => (
          <TaskListItem
            key={task.id}
            task={task}
            tasks={tasks}
            taskActions={taskActions}
          />
        ))}
      </ul>
    </div>
  );
};
