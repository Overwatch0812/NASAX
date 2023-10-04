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
		const res = await fetch(`https://campusx-api.vercel.app/api/${id}/`);
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
		<>
			<img src={projectDetail.thumbnail} />
			<h1 className="text-white">{projectDetail.title}</h1>
			<h1 className="text-white">{projectDetail.author}</h1>
			<h1 className="text-white">{projectDetail.description}</h1>
			<h1 className="text-white">{projectDetail.domain}</h1>
			<h1 className="text-white">{projectDetail.languages_used}</h1>
			<Link className="text-white" to={projectDetail.pdf}>
				Report
			</Link>
			<Link className="text-white" to={projectDetail.codes}>
				Code
			</Link>
			<Link className="text-white" to={projectDetail.txt}>
				Text Files
			</Link>
		</>
	);
};

export default ProjectDetail;
