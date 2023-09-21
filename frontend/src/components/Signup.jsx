import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signup } from "../features/auth/authSlice";

const Signup = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		re_password: "",
	});

	const { email, password, re_password } = formData;

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
			navigate("/");
		}
	});

	const onSubmit = (e) => {
		e.preventDefault();
		const userData = { email, password, re_password };
		dispatch(signup(userData));
	};

	const onChange = (e) =>
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});

	// isAuthenticated
	// if yes ridirect to main page

	return (
		<>
			<h1>Signup</h1>
			<form onSubmit={(e) => onSubmit(e)}>
				<input
					type="email"
					placeholder="Email"
					name="email"
					value={email}
					onChange={(e) => onChange(e)}
					required
				/>
				<input
					type="password"
					placeholder="Password"
					name="password"
					value={password}
					onChange={(e) => onChange(e)}
					required
				/>
				<input
					type="password"
					placeholder="Confirm Password"
					name="re_password"
					value={re_password}
					onChange={(e) => onChange(e)}
					required
				/>
				<button type="submit">Signup</button>
			</form>
			<p>
				Already Have An Account? <Link to="/login">Login</Link>
			</p>
		</>
	);
};

export default Signup;
