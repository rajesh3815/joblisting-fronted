import axios from "axios";
export const jobpost = async (job) => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.post(
      "http://localhost:4000/api/v1/jobs/create",
      job
    );

    alert(response.data.message);
  } catch (error) {
    console.error("Error occurred ", error);
  }
};

export const jobpostDetails = async (jobid) => {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = token;
  try {
    const response = await axios.get(
      `http://localhost:4000/api/v1/jobs/job-details/${jobid}`
    );

    return response.data;
  } catch (error) {
    console.error("Error occurred ", error);
  }
};

export const editJobDetails = async (jobid, reqBody) => {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = token;
  try {
    const response = await axios.put(
      `http://localhost:4000/api/v1/jobs/update/${jobid}`,
      reqBody
    );

    return response.data;
  } catch (error) {
    console.error("Error occurred ", error);
  }
};

export const getAlljobs = async (title, skill) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/api/v1/jobs/all?title=${
        title ? title : ""
      }&skills=${skill ? skill : ""}`
    );

    return response.data;
  } catch (error) {
    console.error("Error occurred ", error);
  }
};
