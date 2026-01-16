async function creatTaskAPI(values, handleResponse, handleErrors, setLoading) {
  setLoading(true);
  try {
    const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
    const endPoint = "/task";
    const url = `${baseUrl}${endPoint}`;
    console.log(url);

    const requestBody = JSON.stringify({
      title: values.taskTitle,
      description: values.taskDescription,
      due_date: values.taskDueDate?.toISOString(),
    });

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    });

    const jsonData = await response.json();
    if (!response.ok) {
      const errorMessage = jsonData.message || "Unkonwn error occured";
      throw new Error(errorMessage);
    }

    handleResponse(jsonData);
  } catch (error) {
    handleErrors(jsonData);
  } finally {
    setLoading(false);
  }
}

export default creatTaskAPI;
