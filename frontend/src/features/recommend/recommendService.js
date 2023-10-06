import axios from "axios";

const Recommend = async (detail) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const url =
    "http://127.0.0.1:8000/recommend/" + detail.id + "/" + detail.domain + "/";
  try {
    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const recommendServicez = { Recommend };
export default recommendServicez;
