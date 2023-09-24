import React, { useState, useEffect } from "react";
import { Link, useNavigate, redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { email_for_reset_pass,reset } from "../features/auth/authSlice";
import { isAuthenticated } from "../features/auth/authService";
import Spinner from "./Spinner";

const ResetPassword = () => {
	const [mailSent,setMailSent]=useState(false)
  const [formData, setFormData] = useState({
    email: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
      dispatch(email_for_reset_pass(email));
	  setMailSent(true)
      dispatch(reset());
  };


if(mailSent){
	navigate('/')
}


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
        <form onSubmit={(e) => onSubmit(e)} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            className=" py-2 px-3 rounded-md"
            onChange={(e) => onChange(e)}
            required
          />
          <div className="text-black bg-[#00df9a] py-2 px-3 rounded-md text-center hover:cursor-pointer">
            <button type="submit">Send Mail</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
