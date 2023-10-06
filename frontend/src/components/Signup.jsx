import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signup, reset } from "../features/auth/authSlice";
import Select from "react-select";

const Signup = () => {
	const branchs = [
		{ value: "CSE", label: "CSE" },
		{ value: "CSE-AIML", label: "CSE-AIML" },
		{ value: "CSE-DS", label: "CSE-DS" },
		{ value: "Cyber-Security", label: "Cyber-Security" },
		{ value: "IOT", label: "IOT" },
		{ value: "Other", label: "Other" },
	];
	const languages = [
		{ value: "C", label: "C" },
		{ value: "C++", label: "C++" },
		{ value: "C#", label: "C#" },
		{ value: "Python", label: "Python" },
		{ value: "JAVA", label: "JAVA" },
		{ value: "Javascript", label: "Javascript" },
		{ value: "Swift", label: "Swift" },
		{ value: "PHP", label: "PHP" },
		{ value: "Other", label: "Other" },
	];

	const domains = [
		{ value: "Web Development", label: "Web Development" },
		{ value: "App Dev", label: "C++" },
		{ value: "Game Dev", label: "Game Dev" },
		{ value: "IOT", label: "IOT" },
		{ value: "Machine Learning", label: "Machine Learning" },
		{ value: "Artificial Intelligence", label: "Artificial Intelligence" },
	];

	const Universities = [
		{ value: "Mumbai University", label: "Mumbai University" },
		{ value: "Delhi University", label: "Delhi University" },
		{ value: "Chandigarh University", label: "Chandigarh University" },
		{ value: "SPPU", label: "SPPU" },
	];

	const Understanding = [
		{ value: "Beginner", label: "Beginner" },
		{ value: "Intermediate", label: "Intermediate" },
		{ value: "Expert", label: "Expert" },
	];
	const AcademicYear = [
		{ value: "FE", label: "FE" },
		{ value: "SE", label: "SE" },
		{ value: "TE", label: "TE" },
		{ value: "BE", label: "BE" },
	];

	const [domain, setDomainz] = useState(domains);
	const [branch, setbranchz] = useState(branchs);
	const [preferred_language, setPreferred_languagez] = useState(languages);
	const [
		level_of_understanding_of_preferred_language,
		setLevel_Of_Understanding_Of_Preferred_Languagez,
	] = useState(Understanding);
	const [university, setUniversitiez] = useState(Universities);
	const [academic_year, setAcademicYearz] = useState(AcademicYear);

	const [formData, setFormData] = useState({
		email: "",
		full_name: "",
		password: "",
		re_password: "",
	});

	const { email, password, re_password, full_name } = formData;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useSelector((state) => {
		state.auth;
	});

	const { user, isLoading, IsError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		if (IsError) {
			console.error("ERROR");
		}
		if (isSuccess || user) {
			navigate("/lobby");
		}

		dispatch(reset());
	}, [user, IsError, isSuccess, dispatch, navigate]);

	const onSubmit = (e) => {
		e.preventDefault();
		if (password === re_password) {
			const userData = {
				email,
				password,
				re_password,
				full_name,
				domain,
				branch,
				preferred_language,
				level_of_understanding_of_preferred_language,
				university,
				academic_year,
			};
			dispatch(signup(userData)).then((e) => {
				console.log(e);
			});
			console.log(user, isLoading, IsError, isSuccess, message);
		} else {
			alert("password not matching");
		}
	};

	const onChangeData = (e) =>
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});

	return (
		<div className="max-w-[800px] min-h-screen mx-auto w-[65%] px-4 my-12 flex flex-col gap-5">
			<div className="border px-6 py-3 rounded-lg">
				<h1 className="w-full text-2xl my-3 mb-7 font-bold text-[#00df9a] text-center">
					<Link to="/signup">Register</Link>
				</h1>
				{isLoading && <Spinner />}
				<form
					onSubmit={(e) => onSubmit(e)}
					className="flex flex-col gap-3 "
				>
					<div className="flex flex-col lg:flex-row gap-3">
						<input
							type="text"
							placeholder="Full-Name"
							name="full_name"
							value={full_name}
							onChange={(e) => onChangeData(e)}
							required
							className="lg:basis-1/2 py-2 px-3 rounded-md"
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							value={email}
							onChange={(e) => onChangeData(e)}
							required
							className="basis-1/2 py-2 px-3 rounded-md"
						/>
					</div>
					<Select
						options={branch}
						value={branch.value}
						defaultValue={branch[0]}
						onChange={(e) => {
							setbranchz(e.value);
						}}
					/>

					<Select
						value={preferred_language.value}
						options={preferred_language}
						defaultValue={preferred_language[0]}
						onChange={(e) => setPreferred_languagez(e.value)}
					/>

					<Select
						value={domain.value}
						options={domain}
						defaultValue={domain[0]}
						onChange={(e) => setDomainz(e.value)}
					/>

					<Select
						value={
							level_of_understanding_of_preferred_language.value
						}
						onChange={(e) =>
							setLevel_Of_Understanding_Of_Preferred_Languagez(
								e.value
							)
						}
						options={level_of_understanding_of_preferred_language}
						defaultValue={
							level_of_understanding_of_preferred_language[0]
						}
					/>

					<Select
						value={university.value}
						options={university}
						onChange={(e) => setUniversitiez(e.value)}
						defaultValue={university[0]}
					/>

					<Select
						value={academic_year.value}
						options={academic_year}
						onChange={(e) => setAcademicYearz(e.value)}
						defaultValue={academic_year[0]}
					/>
					<div className="flex flex-col lg:flex-row gap-3">
						<input
							type="password"
							placeholder="Password"
							name="password"
							value={password}
							onChange={(e) => onChangeData(e)}
							required
							className="basis-1/2 py-2 px-3 rounded-md"
						/>
						<input
							type="password"
							placeholder="Confirm Password"
							name="re_password"
							value={re_password}
							onChange={(e) => onChangeData(e)}
							required
							className="basis-1/2 py-2 px-3 rounded-md"
						/>
					</div>
					<button
						type="submit"
						className="text-black bg-[#00df9a] py-2 px-3 rounded-md"
					>
						Signup
					</button>
				</form>
				<p className="text-white text-center mt-3 mb-2">
					Already Have An Account?{" "}
					<Link to="/login">
						<span className="text-blue-400 underline">Login</span>
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Signup;
