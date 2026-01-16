import React from "react";
import UserIcon from "../assets/user-icon.png";
import FolderWhite from "../assets/folder-white.svg";

const NoTask = ({ showCreateTaskScreen }) => {
  return (
    <div className="flex flex-col items-center content-section">
      <div className="content-selection-container flex flex-col justify-center">
        <img src={UserIcon} alt="User with no pending task" loading="lazy" />
        <h1 className="no-task-primary-text">Whoo, you are all done</h1>
        <p>There are no tasks added yet, Click to add new task</p>
        <button
          className="btn btn-purple create-task-btn"
          onClick={showCreateTaskScreen}
        >
          <img src={FolderWhite} alt="create task item" />
          Create new Task
        </button>
      </div>
    </div>
  );
};

export default NoTask;
