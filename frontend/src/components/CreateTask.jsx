import React, { useCallback, useState } from "react";
import InputField from "./UI/inputField";
import UserIcon from "../assets/user-icon.png";
import TitleImg from "../assets/title-placeholder-img.svg";
import Memo from "../assets/memo.svg";
import Calendar from "../assets/calendar.svg";
import clsx from "clsx";
import creatTaskAPI from "./api/createTask";

const CreateTask = ({ showTaskListScreen, fetchAllTask }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState();
  const [loading, setLoading] = useState(false);

  const handleTitleChange = useCallback(function (event) {
    setTaskTitle(event.target.value);
  }, []);
  const handleDescriptionChange = useCallback(function (event) {
    setTaskDescription(event.target.value);
  }, []);
  const handleDateChange = useCallback(function (date) {
    setTaskDueDate(date);
  }, []);

  // Validation
  const validate = useCallback(function (values) {
    const { taskTitle, taskDescription } = values;
    if (taskTitle && taskDescription) {
      return true;
    } else {
      const errorMessage = "Please fill out the title and Description";
      console.error(errorMessage);
      return false;
    }
  }, []);

  const handleResponse = useCallback(function (responseData) {
    console.log(responseData);
    if (responseData.success) {
      console.log("handeled successfull");
      fetchAllTask();
    }
  }, []);
  const handleError = useCallback(function (errorMsg) {
    alert(errorMsg);
    console.log(errorMsg);
  });

  const createNewTask = useCallback(
    (values) => {
      creatTaskAPI(values, handleResponse, handleError, setLoading);
    },
    [handleError, handleResponse]
  );

  const handleAddTask = useCallback(() => {
    const values = {
      taskTitle,
      taskDescription,
      taskDueDate,
    };
    const isValid = validate(values);
    if (isValid) createNewTask(values);
  }, [createNewTask, taskDescription, taskTitle, taskDueDate, validate]);

  // How to write a form inside a react
  return (
    <div className="content-section create-task-section">
      <div className="create-task-card">
        <img src={UserIcon} alt="" width={263} />
        <h1 className="create-task-title-text">Create New Task</h1>
        {/* Custon input field for title */}
        <InputField
          name={"new-task-title"}
          value={taskTitle}
          onChange={handleTitleChange}
          label={"Title"}
          type={"text"}
          inputImg={TitleImg}
          placeholder={"Title"}
        />

        {/* Custon input field for description  */}
        <InputField
          name={"new-task-description"}
          value={taskDescription}
          onChange={handleDescriptionChange}
          label={"Description"}
          type={"textarea"}
          inputImg={Memo}
          placeholder={"Description"}
          className={"input-margin"}
        />

        {/* Custon input field for date */}
        <InputField
          name={"new-task-due-date"}
          value={taskDueDate}
          onChange={handleDateChange}
          label={"Due Date"}
          type={"date"}
          inputImg={Calendar}
          placeholder={"Due date"}
          className={"input-margin"}
        />
        <div className="add-edit-task-btns">
          <button
            className={clsx(
              "btn",
              "add-task-btn",
              loading ? "disable-add-task-btn" : "cursor-pointer"
            )}
            disabled={loading}
            onClick={handleAddTask}
          >
            {loading ? "Adding Task" : "Add Task"}
          </button>
          <button
            className="btn cancel-btn cursor-pointer"
            onClick={showTaskListScreen}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
