import axios from "axios";

export const fetchProjectData = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const Url = "http://127.0.0.1:7000/api/";
  try {
    const res = await axios.get(Url, config);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const FetchProjectDetail = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const Url = "http://127.0.0.1:7000/api/" + id + "/";
  try {
    const res = await axios.get(Url, config);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const UploadProject = async (userData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const Url = "http://127.0.0.1:7000/api/create/";
  try {
    const res = await axios.post(Url, userData, config);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const projectService = { fetchProjectData, FetchProjectDetail, UploadProject };
export default projectService;
