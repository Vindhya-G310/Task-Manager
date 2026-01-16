import React, { useState } from "react";
import { AlarmClockCheck, FilePenLine, Trash2, X } from "lucide-react";
import CheckedBlue from "../assets/blue-checked.svg";
import Modal from "./UI/Modal";
import moment from "moment";
import DeleteTask from "./UI/DeleteTask";

const ViewTask = ({
  task,
  showTaskListScreen,
  showEditTaskScreen,
  setActiveTask,
  fetchAllTask,
}) => {
  const [showDeleteTaskPopup, setShowDeleteTaskPopup] = useState(false);

  const openDeleteTask = () => {
    setShowDeleteTaskPopup(true);
  };
  const closeDeleteTask = () => {
    setShowDeleteTaskPopup(false);
  };

  const handleEditTask = function () {
    setActiveTask(task);
    showEditTaskScreen();
  };
  return (
    <Modal isOpen={true}>
      <div className="flex justify-between view-task-header">
        <div className="flex">
          <span className="task-icon-wrapper">
            <img src={CheckedBlue} alt="task-icon" className="task-icon" />
          </span>
          <h2 className="view-task-title">{task.title}</h2>
        </div>
        <div className="close-modal-btn">
          <X style={{ color: "black" }} onClick={showTaskListScreen} />
        </div>
      </div>

      <div className="flex">
        <pre className="view-task-description">{task.description}</pre>
        <div className="view-task-right-section">
          {task.due_date && (
            <div className="view-task-info-box">
              <p className="label-14">Due Date</p>
              <div className="flex-container">
                <AlarmClockCheck style={{ color: "blue" }} />
                <p className="date-text">
                  {moment(task.due_date).format("DD MMM YYYY")}
                </p>
              </div>
            </div>
          )}
          <div
            className="view-task-info-box flex cursor-pointer"
            onClick={handleEditTask}
          >
            <FilePenLine style={{ color: "green", marginRight: "10px" }} />
            <p className="label-12">Edit Task</p>
          </div>
          <div
            className="view-task-info-box flex cursor-pointer"
            onClick={openDeleteTask}
          >
            <Trash2 style={{ color: "red", marginRight: "10px" }} />
            <p className="label-12">Delete Task</p>
          </div>
        </div>
      </div>

      {showDeleteTaskPopup && (
        <DeleteTask
          isOpen={openDeleteTask}
          onClose={closeDeleteTask}
          task={task}
          fetchAllTask={fetchAllTask}
        />
      )}
    </Modal>
  );
};

export default ViewTask;
