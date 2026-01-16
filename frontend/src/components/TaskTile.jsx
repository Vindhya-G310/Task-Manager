import React, { useCallback, useState } from "react";
import CheckedBlue from "../assets/blue-checked.svg";
import AlramClock from "../assets/alarm-clock.svg";
import Edit from "../assets/edit.svg";
import Delete from "../assets/delete.svg";
import moment from "moment";
import DeleteTask from "./UI/DeleteTask";
import fetchTaskAPI from "./api/fetchTask";

const TaskTile = ({
  task,
  onClick,
  showEditTaskScreen,
  setActiveTask,
  fetchAllTask,
}) => {
  const [showDeleteTaskPopup, setShowDeleteTaskPopup] = useState(false);

  const handleDeleteTask = useCallback((e) => {
    e.stopPropagation();
    setShowDeleteTaskPopup(true);
  }, []);

  const closeDeleteTaskPopup = useCallback(() => {
    setShowDeleteTaskPopup(false);
  }, []);

  const handleEditTask = (e) => {
    e.stopPropagation();
    setActiveTask(task);
    showEditTaskScreen();
  };
  return (
    <>
      <div className="task-tile-container cursor-pointer" onClick={onClick}>
        <span className="task-icon-wrapper">
          <img src={CheckedBlue} className="task-icon" alt="Task Icon" />
        </span>
        <div className="task-text-wrapper">
          <p className="task-primary-text">{task.title}</p>
          <p className="task-secondary-text">{task.description}</p>
        </div>
        <div className="action-items-container">
          {task.due_date && (
            <div className="flex date-container">
              <img src={AlramClock} alt="alarm clock" />
              <p className="date-text">
                {moment(task.due_date).format("DD MMM YYYY")}
              </p>
            </div>
          )}
          <div
            className="delete-container cursor-pointer"
            onClick={handleEditTask}
          >
            <img src={Edit} alt="Edit task icon" />
          </div>

          <div
            className="delete-container cursor-pointer"
            onClick={handleDeleteTask}
          >
            <img src={Delete} alt="Delete task icon" />
          </div>
        </div>
      </div>
      {showDeleteTaskPopup && (
        <DeleteTask
          isOpen={showDeleteTaskPopup}
          onClose={closeDeleteTaskPopup}
          task={task}
          fetchAllTask={fetchAllTask}
        />
      )}
    </>
  );
};

export default TaskTile;
