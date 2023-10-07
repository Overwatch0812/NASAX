import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signup, reset } from "../features/auth/authSlice";
import Spinner from "./Spinner";
import { useState } from "react";
export default function AddProject() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useSelector((state) => {
		state.auth;
	});

	const { user, isLoading, IsError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	const animatedComponents = makeAnimated();

	const typeOfCollaborators = [
		{ value: "Full-Time", label: "Full-Time" },
		{ value: "Part-Time", label: "Part-Time" },
		{ value: "Non-Employed", label: "Non-Employed" },
		{ value: "Student", label: "Student" },
	];

	const levelOfExpertise = [
		{ value: "Rookie", label: "Rookie" },
		{ value: "Intermediate", label: "Intermediate" },
		{ value: "Pro", label: "Pro" },
	];

	const tech = [
		{ value: "React", label: "React" },
		{ value: "Python", label: "Python" },
		{ value: "Javascript", label: "Javascript" },
		{ value: "MongoDB", label: "MongoDB" },
		{ value: "PostgreSQL", label: "PostgreSQL" },
		{ value: "ExpressJS", label: "ExpressJS" },
		{ value: "NodeJS", label: "NodeJS" },
		{ value: "AngularJS", label: "AngularJS" },
		{ value: "VueJS", label: "VueJS" },
	];

	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
	const [gitlink, setGitLink] = useState("");
	const [techstack, setTechstack] = useState([]);
	const [collaborators, setCollaborators] = useState(null);
	const [expertise, setExpertise] = useState(null);
	const [serviceList, setServiceList] = useState([{ service: null }]);
	// const handleTech = (selectedOption) => {
	// 	console.log(selectedOption);
	// 	setTechstack(selectedOption);
	// 	console.log(techstack);
	// };

	const handleServiceChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...serviceList];
		list[index][name] = value;
		setServiceList(list);
	};

	const handleServiceRemove = (index) => {
		const list = [...serviceList];
		list.splice(index, 1);
		setServiceList(list);
	};

	const handleServiceAdd = () => {
		setServiceList([...serviceList, { service: "" }]);
	};

	const onSubmit = (e) => {};
	return (
		<div>
			<div className="max-w-[800px] min-h-screen mx-auto w-[65%] px-4 my-12 flex flex-col gap-5">
				<div className="border px-6 py-3 rounded-lg">
					<h1 className="w-full text-2xl my-3 mb-7 font-bold text-[#00df9a] text-center">
						<Link to="/signup">Add Project</Link>
					</h1>
					{/* {isLoading && <Spinner />} */}
					<form
						onSubmit={(e) => onSubmit(e)}
						className="flex flex-col gap-3 "
					>
						<div className="flex flex-col gap-3">
							<input
								type="text"
								placeholder="Project Title"
								name="title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								required
								className="lg:basis-1/2 py-2 px-3 rounded-md"
							/>
							<textarea
								name="description"
								id=""
								cols="30"
								rows="10"
								placeholder="Add description"
								value={desc}
								className="px-3 py-2 rounded-md"
								onChange={(e) => setDesc(e.target.value)}
							></textarea>
							<div className="flex items-center gap-4">
								<label
									htmlFor="imageFile"
									className="text-white text-lg"
								>
									Project Thumbnail
								</label>
								<input
									type="file"
									id="imageFile"
									accept="image/*"
								/>
							</div>
							<input
								type="url"
								placeholder="Github Repository Link"
								className="lg:basis-1/2 py-2 px-3 rounded-md"
								onChange={(e) => setGitLink(e.target.value)}
							/>
						</div>
						<Select
							options={typeOfCollaborators}
							value={typeOfCollaborators.value}
							// defaultValue={typeOfCollaborators[0]}
							placeholder="Preffered Collaborator"
							onChange={(e) => setCollaborators(e.value)}
						/>
						<Select
							value={levelOfExpertise.value}
							options={levelOfExpertise}
							// defaultValue={levelOfExpertise[0]}
							placeholder="Preffered Level of Expertise"
							onChange={(e) => setExpertise(e.value)}
						/>
						<Select
							value={techstack.value}
							options={tech}
							isMulti
							components={animatedComponents}
							// defaultValue={levelOfExpertise[0]}
							placeholder="Techstack"
							onChange={(e) => setTechstack(e)}
						/>
						<label htmlFor="service" className="text-white text-lg">
							Tasks(s)
						</label>
						{serviceList.map((singleService, index) => (
							<div key={index} className="services">
								<div className="first-division text-white gap-3">
									<input
										name="service"
										type="text"
										id="service"
										value={singleService.service}
										onChange={(e) =>
											handleServiceChange(e, index)
										}
										className="text-black w-full px-3 py-2 rounded-md"
										required
									/>
									<div className="flex gap-3 my-2">
										{serviceList.length - 1 === index &&
											serviceList.length < 4 && (
												<button
													type="button"
													onClick={handleServiceAdd}
													className="add-btn"
												>
													<span>Add a Task</span>
												</button>
											)}
										<div className="second-division text-white">
											{serviceList.length !== 1 && (
												<button
													type="button"
													onClick={() =>
														handleServiceRemove(
															index
														)
													}
													className="remove-btn"
												>
													<span>Remove</span>
												</button>
											)}
											{console.log(serviceList)}
										</div>
									</div>
								</div>
							</div>
						))}

						<button
							type="submit"
							className="text-black bg-[#00df9a] py-2 px-3 rounded-md"
						>
							Add Project
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}