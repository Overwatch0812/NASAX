import React, { useState, useEffect } from "react";
import { useParams, useNavigate, redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetPasswordConfirm, reset } from "../features/auth/authSlice";
import { isAuthenticated } from "../features/auth/authService";
import Spinner from "./Spinner";

const ResetPasswordConfirm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {uid,token} = useParams();

  const [passwordChanged, setPasswordChanged] = useState(false);
  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });

  const { new_password,re_new_password } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPasswordConfirm(uid,token,new_password,re_new_password));
    setPasswordChanged(true);
    dispatch(reset());
  };

  if (passwordChanged) {
    navigate("/");
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
          Set New Password
        </h1>
        <form onSubmit={(e) => onSubmit(e)} className="flex flex-col gap-3">
		<input
            type="password"
            placeholder="New Password"
            name="new_password"
            value={new_password}
            className=" py-2 px-3 rounded-md"
            onChange={(e) => onChange(e)}
            required
          />
		<input
            type="password"
            placeholder="Confirm New Password"
            name="re_new_password"
            value={re_new_password}
            className=" py-2 px-3 rounded-md"
            onChange={(e) => onChange(e)}
            required
          />
          <div className="text-black bg-[#00df9a] py-2 px-3 rounded-md text-center hover:cursor-pointer">
            <button type="submit">Set Password</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordConfirm;
