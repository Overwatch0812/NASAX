import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjectDetail } from "../features/projects/projectSlice";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

const ProjectDetail = () => {
  const dispatch = useDispatch();
  const [projectDetail, setProjectDetail] = useState(null);
  const { id } = useParams();

  // useEffect(() => {
  // 	if (id) {
  // 		dispatch(fetchProjectDetail(id)).then((e) =>
  // 			setProjectDetail(e.payload)
  // 		);
  // 	}
  // }, []);

  async function getProjectById() {
    const res = await fetch(
      `https://manage-leszjnj0o-overwatch0812.vercel.app/api/${id}/`
    );
    const data = await res.json();
    console.log(data);
    setProjectDetail(data);
  }

  useEffect(() => {
    if (id) {
      getProjectById();
    }
  }, []);
  console.log(projectDetail);

  return !projectDetail ? (
    <Spinner />
  ) : (
    <div className="max-w-[1200px]  mx-3 lg:mx-auto flex flex-col text-white">
      <div className="flex flex-col gap-3">
        <img src={projectDetail.thumbnail} />
        <h1 className=" text-3xl font-semibold">{projectDetail.title}</h1>
        <div className="flex justify-between">
          <h1 className=" text-xl">{projectDetail.author}</h1>
          <div className="flex gap-3 align-middle text-baseGreen">
            <h1 className="">{projectDetail.domain}</h1>
            <h1 className="">{projectDetail.languages_used}</h1>
          </div>
        </div>
        <h1 className="">{projectDetail.description}</h1>
      </div>
      <div className="w-full flex items-center justify-center gap-4">
        <Link className="text-baseGreen" to={projectDetail.pdf}>
          <button className="text-xl bg-white">Report</button>
        </Link>
        <Link className="text-baseGreen" to={projectDetail.codes}>
          <button className="text-xl bg-white">Code</button>
        </Link>
        <Link className="text-baseGreen" to={projectDetail.txt}>
          <button className="text-xl bg-white">Text Files</button>
        </Link>
      </div>
    </div>
  );
};

export default ProjectDetail;
