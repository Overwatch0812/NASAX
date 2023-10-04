import React, { useState, useEffect } from "react";
import { Link, useNavigate, redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, reset, load } from "../features/auth/authSlice";
import { isAuthenticated } from "../features/auth/authService";
import Spinner from "./Spinner";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, IsError, isSuccess, message, isUserLoaded } =
    useSelector((state) => state.auth);

  const { email, password } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(login(userData));
  };

  useEffect(() => {
    if (IsError) {
      console.error(message);
    }
    if (isSuccess || user) {
      navigate("/feed");
    }
    if (isSuccess) {
      if (isAuthenticated()) {
        dispatch(load());
      } else {
        console.log("JWT is not valid");
      }
    }

    // dispatch(reset());
  }, [IsError, isSuccess, dispatch, navigate]);

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  // isAuthenticated
  // if yes ridirect to main page

  return (
    <div className="max-w-[500px]  mx-auto w-[65%] px-4 my-12 flex flex-col gap-5">
      <div className="border px-6 py-3 rounded-lg ">
        <h1 className="w-full text-2xl my-3 mb-7 font-bold text-[#00df9a] text-center">
          Login
        </h1>
        {isLoading && <Spinner />}
        <form onSubmit={(e) => onSubmit(e)} className="flex flex-col gap-3">
          {/* <input
						type="text"
						placeholder="Enter your Fullname"
						name="name"
						className=" py-2 px-3 rounded-md"
						required
					/> */}
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            className=" py-2 px-3 rounded-md"
            onChange={(e) => onChange(e)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            className=" py-2 px-3 rounded-md"
            onChange={(e) => onChange(e)}
            required
          />
          <div className="flex gap-3">
            <input type="checkbox" name="" id="" required />
            <p className="text-white">
              I agree to the{" "}
              <span className="text-blue-400 underline">
                Terms and Conditions
              </span>
            </p>
          </div>
          <div className="text-black bg-[#00df9a] py-2 px-3 rounded-md text-center hover:cursor-pointer">
            <button type="submit">Login</button>
          </div>
        </form>
        <div className="flex flex-col">
          <p className="text-white text-center mt-3 mb-2">
            Don't have account?{" "}
            <Link to="/signup">
              <span className="text-blue-400 underline">Signup</span>
            </Link>
          </p>
          <p className="text-white text-center mt-3 mb-2">
            Forgot Password?{" "}
            <Link to="/reset-password">
              <span className="text-blue-400 underline">Reset Password</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

// const mapStateToProps=state=>({
//     // Logic to chenck isAuthenticated
// });

export default Login;
