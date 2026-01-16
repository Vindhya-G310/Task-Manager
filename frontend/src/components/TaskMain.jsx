import React, { useCallback, useEffect, useState } from "react";
import Loading from "./UI/loading.jsx";
import fetchTaskAPI from "./api/fetchTask.js";
import TaskList from "./TaskList.jsx";
import CreateTask from "./CreateTask.jsx";
import NoTask from "./NoTask.jsx";
import ViewTask from "./ViewTask.jsx";
import EditTask from "./EditTask.jsx";

const TaskMain = () => {
  const [currentComponent, setCurrentComponent] = useState("loading");
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState();

  const showNoTaskScreen = useCallback(function () {
    setCurrentComponent("noTask");
  }, []);
  const showCreateTaskScreen = useCallback(function () {
    setCurrentComponent("createTask");
  }, []);

  const showTaskListScreen = useCallback(function () {
    setCurrentComponent("taskList");
  }, []);

  const showEditTaskScreen = useCallback(function () {
    setCurrentComponent("editTask");
  }, []);

  const showViewTaskScreen = useCallback(function () {
    setCurrentComponent("viewTask");
  }, []);

  const handleResponse = useCallback(
    function (responseData) {
      const extractedTasks = responseData.tasks;
      setTasks(extractedTasks);
      if (extractedTasks.length) {
        showTaskListScreen();
      } else {
        showNoTaskScreen();
      }
    },
    [showTaskListScreen, showNoTaskScreen]
  );

  const handleError = useCallback(function (errorMsg) {
    alert(errorMsg);
    console.error(errorMsg);
  }, []);

  const fetchAllTask = useCallback(
    function () {
      fetchTaskAPI(handleResponse, handleError);
    },
    [handleResponse, handleError]
  );

  useEffect(() => {
    fetchAllTask();
  }, [fetchAllTask]);

  return (
    <div>
      {currentComponent === "loading" && <Loading />}
      {
        <div id="container-div">
          {currentComponent === "noTask" && (
            <NoTask showCreateTaskScreen={showCreateTaskScreen} />
          )}
          {currentComponent === "taskList" && (
            <TaskList
              tasks={tasks}
              showCreateTaskScreen={showCreateTaskScreen}
              showEditTaskScreen={showEditTaskScreen}
              showViewTaskScreen={showViewTaskScreen}
              setActiveTask={setActiveTask}
              fetchAllTask={fetchAllTask}
            />
          )}
          {currentComponent === "createTask" && (
            <CreateTask
              showTaskListScreen={showTaskListScreen}
              fetchAllTask={fetchAllTask}
            />
          )}
          {currentComponent === "viewTask" && (
            <ViewTask
              task={activeTask}
              showTaskListScreen={showTaskListScreen}
              setActiveTask={setActiveTask}
              showEditTaskScreen={showEditTaskScreen}
              fetchAllTask={fetchAllTask}
            />
          )}
          {currentComponent === "editTask" && (
            <EditTask
              task={activeTask}
              showTaskListScreen={showTaskListScreen}
              fetchAllTask={fetchAllTask}
            />
          )}
        </div>
      }
    </div>
  );
};

export default TaskMain;
