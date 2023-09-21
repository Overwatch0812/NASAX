import React, { useState,useEffect } from "react";
import { Link,useNavigate} from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch=useDispatch()
  const navigate=useNavigate()


  const { email, password } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    const userData={email,password}
    dispatch(login(userData))
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
      <h1>Login</h1>
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
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have account? <Link to='/signup'>Sign Up</Link>
      </p>
      <p>
       Forgot Password? <Link to='/reset-password'>Reset Password</Link>
      </p>
    </>
  );
};

// const mapStateToProps=state=>({
//     // Logic to chenck isAuthenticated
// });

export default Login;
