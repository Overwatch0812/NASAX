import axios from "axios";

export const fetchProjectData = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const Url = "http://127.0.0.1:8000/api/";
  try {
    const res = await axios.get(Url, config);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const projectService = { fetchProjectData };
export default projectService;
