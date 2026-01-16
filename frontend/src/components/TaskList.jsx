import React, { useCallback } from "react";
import folderImg from "../assets/folder-white.svg";
import TaskTile from "./TaskTile.jsx";

const TaskList = ({
  tasks,
  showCreateTaskScreen,
  showEditTaskScreen,
  showViewTaskScreen,
  setActiveTask,
  fetchAllTask,
}) => {
  const viewTask = useCallback(
    (task) => {
      setActiveTask(task);
      showViewTaskScreen();
    },
    [setActiveTask, showCreateTaskScreen]
  );

  return (
    <div className="task-list-screen content-section">
      <div className="content-section-container">
        <div className="task-list-header-main">
          <p className="task-heading">🔥Task</p>
          <button
            className="add-task-btn cursor-pointer"
            onClick={showCreateTaskScreen}
          >
            <img src={folderImg} alt="add task Icon" />
            Add New Task
          </button>
        </div>

        {/* Task List */}
        <div className="task-list-container">
          {tasks.map((task) => (
            <TaskTile
              key={task._id + "-task-tile"}
              task={task}
              onClick={() => viewTask(task)}
              showEditTaskScreen={showEditTaskScreen}
              setActiveTask={setActiveTask}
              fetchAllTask={fetchAllTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
