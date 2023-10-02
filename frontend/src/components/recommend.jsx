import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { recommend } from "../features/recommend/recommendSlice";

const Recommend = () => {
  const dispatch = useDispatch();
  const { id, domain } = useParams();
  useEffect(() => {
    const detail = { id, domain };
    dispatch(recommend(detail)).then((res) => console.log(res));
  }, []);
  return (
    <div>
      <h1 className="text-white">{id}</h1>
      <h1 className="text-white">{domain}</h1>
    </div>
  );
};

export default Recommend;
