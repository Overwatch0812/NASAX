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
    const res = await fetch(`http://127.0.0.1:7000/api/${id}/`);
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
      <div className="flex flex-col gap-5">
        {/* <img src={projectDetail.thumbnail} /> */}
        <h1 className=" text-3xl font-semibold">{projectDetail.title}</h1>
        <div className="flex flex-col justify-between">
          {/* <h1 className=" text-xl">{projectDetail.email}</h1> */}
          <div className="flex gap-5 align-middle text-white ">
            <div className="pr-3 border-r-2">
              <h2 className="text-baseGreen text-xl">Tech Stack</h2>
              <ul className="flex gap-2 ">
                {projectDetail.tech_stack.map((tech, i) => {
                  return <li key={i}>{tech.value}</li>;
                })}
              </ul>
            </div>
            <div className="pr-3 border-r-2">
              <h2 className="text-baseGreen text-xl">Difficulty</h2>
              <h1 className="">
                {projectDetail.level_of_expertise_of_collaborator}
              </h1>
            </div>
            <div className="pr-3">
              <h2 className="text-baseGreen text-xl">Job Role</h2>
              <h1 className="">{projectDetail.type_of_collaborator}</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-baseGreen text-xl">Description</h1>
          {/* <h1 className="">{projectDetail.description}</h1> */}
          <h1 className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
            suscipit dolorum tenetur labore sed aperiam porro. Vero, officiis!
            Debitis voluptates blanditiis, atque deleniti veniam excepturi modi
            sequi! Repellendus dolorum non voluptas, aliquid a id eligendi.
          </h1>
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-baseGreen text-xl">Tasks</h1>

          <ul className="flex flex-col gap-1 list-disc ml-4">
            {projectDetail.tasks.map((task, i) => {
              return <li key={i}>{task.service}</li>;
            })}
          </ul>
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-baseGreen text-xl">Repository Link</h1>
          <h1 className="text-blue-500 underline">
            <a href={projectDetail.github_link}>{projectDetail.github_link}</a>
          </h1>
        </div>
      </div>
      {/* <div className="w-full flex items-center justify-center gap-4">
				<Link className="text-baseGreen" to={projectDetail.pdf}>
					<button className="text-xl bg-white">Report</button>
				</Link>
				<Link className="text-baseGreen" to={projectDetail.codes}>
					<button className="text-xl bg-white">Code</button>
				</Link>
				<Link className="text-baseGreen" to={projectDetail.txt}>
					<button className="text-xl bg-white">Text Files</button>
				</Link>
			</div> */}
    </div>
  );
};

export default ProjectDetail;
