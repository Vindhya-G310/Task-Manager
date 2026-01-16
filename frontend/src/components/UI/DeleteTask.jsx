import React, { useCallback, useState } from "react";
import deleteTaskAPI from "../api/deleteTask";
import Info from "../../assets/info.svg";
import Modal from "./Modal";
import { X } from "lucide-react";
import clsx from "clsx";

const DeleteTask = ({ isOpen, onClose, task, fetchAllTask }) => {
  const [loading, setLoading] = useState(false);
  const handleResponse = useCallback(() => {
    onClose();
    fetchAllTask();
  });

  const handleError = useCallback((errorMsg) => {
    console.error(errorMsg);
    alert(errorMsg);
  });

  const deleteTask = useCallback(() => {
    deleteTaskAPI(task._id, handleResponse, handleError, setLoading);
  }, [handleResponse, handleError, task._id]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="delete-task-container">
        <div className="text-right delete-task-header">
          <img src={Info} alt="" className="delete-popup-ifo-icon" />
          <div className="close-modal-btn">
            <X style={{ color: "black" }} onClick={onClose} />
          </div>
        </div>
        <div className="delete-popup-content">
          <p className="delete-task-text">
            Are you sure you want to delete
            <span className="delete-task-title">{task.title}</span>
          </p>
          <div className="delete-action-btns">
            <button className="btn cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button
              className={clsx(
                "btn",
                "delete-btn",
                loading && "disabled-delete-btn"
              )}
              onClick={deleteTask}
              disabled={loading}
            >
              {loading ? "Deleting....." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteTask;
