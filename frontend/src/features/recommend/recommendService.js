import axios from "axios";

const Recommend = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const url = "http://127.0.0.1:7000/ML/" + id + "/";
  try {
    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const recommendServicez = { Recommend };
export default recommendServicez;
