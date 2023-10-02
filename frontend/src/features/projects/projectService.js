import axios from "axios";

export const fetchProjectData = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const Url = "https://campusx-api.vercel.app/api/";
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
  const Url = "https://campusx-api.vercel.app/api/" + id + "/";
  try {
    const res = await axios.get(Url, config);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const projectService = { fetchProjectData, FetchProjectDetail };
export default projectService;
