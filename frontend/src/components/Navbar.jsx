import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Analytics from "./Analytics";
import { isAuthenticated } from "../features/auth/authService";
import { resetProject } from "../features/projects/projectSlice";

import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isUserLoaded } = useSelector((state) => state.auth);
  //   const [user, setUser] = useState(true);
  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    dispatch(resetProject());
    navigate("/login");
  };

  return (
    <>
      <div
        className={
          user
            ? "flex justify-between items-center h-24 mx-auto px-4 pt-1 text-white bg-black1"
            : "flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 pt-1 text-white bg-black1"
        }
      >
        <h1 className="w-full text-4xl font-bold text-[#00df9a]">
          <Link to="/">CampusX.</Link>
        </h1>
        <ul className="hidden md:flex uppercase">
          {user ? (
            <>
              <li className="p-4 md:text-2xl">
                <Link to="/">Home</Link>
              </li>
              <li className="p-4 md:text-2xl">
                <Link to="/feed">About</Link>
              </li>
              <li className="p-4 md:text-2xl">
                <Link to={"/recommend/" + user.id + "/" + user.domain + "/"}>
                  Projects
                </Link>
              </li>
              <li className="p-4 md:text-2xl">Contact</li>
              <li className="p-4 md:text-2xl">
                <Link to="/" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <div className="flex justify-center items-center gap-4">
              <li className="p-4 md:text-2xl">
                <Link to="/login">Login</Link>
              </li>

              <li className="p-4 md:text-2xl">
                <Link to="/signup">SignUp</Link>
              </li>
            </div>
          )}
        </ul>
        <div className="block md:hidden">
          {nav ? (
            <AiOutlineClose size={20} onClick={() => setNav(false)} />
          ) : (
            <AiOutlineMenu size={20} onClick={() => setNav(true)} />
          )}
        </div>
        {nav && (
          <ul className="fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500">
            {user ? (
              <>
                <Link to="/">
                  <button className="w-full text-3xl font-bold text-[#00df9a] m-4">
                    CampusX.
                  </button>
                </Link>
                <li className="p-4 md:text-xl">
                  <Link to="/">Home</Link>
                </li>
                <li className="p-4 md:text-xl">
                  <Link to="/feed">About</Link>
                </li>
                <li className="p-4 md:text-xl">Contact</li>
                <li className="p-4 md:text-xl">
                  <Link to="/" onClick={handleLogout}>
                    LogOut
                  </Link>
                </li>
              </>
            ) : (
              <>
                <Link to="/">
                  <button className="w-full text-3xl font-bold text-[#00df9a] m-4">
                    CampusX.
                  </button>
                </Link>
                <li className="p-4 md:text-xl">
                  <Link to="/login">Login</Link>
                </li>

                <li className="p-4 md:text-xl">
                  <Link to="/signup">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        )}
      </div>
    </>
  );
};

export default Navbar;
