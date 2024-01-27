import { useState, Fragment } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import Analytics from "./Analytics";
import { isAuthenticated } from "../features/auth/authService";
import { resetProject } from "../features/projects/projectSlice";

import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isUserLoaded } = useSelector((state) => state.auth);
  //   const [user, setUser] = useState(true);

  const options = ["Profile", "My Projects", "three"];

  const defaultOption = options[0];
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
        <ul className="hidden md:flex  items-center uppercase">
          {user ? (
            <>
              <li className="p-4 md:text-xl">
                <Link to="/">Home</Link>
              </li>
              <li className="p-4 md:text-xl">
                <Link to="/feed">About</Link>
              </li>
              <li className="p-4 md:text-xl">
                <Link to="/feed">Projects</Link>
              </li>
              <li className="p-4 md:text-xl">
                <Link to="/search">{<FiSearch size={25} />}</Link>
              </li>
              <li className="p-4 md:text-xl">
                {/* <button

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
        <ul className="hidden md:flex  items-center uppercase">
          {user ? (
            <>
              <li className="p-4 md:text-xl">
                <Link to="/">Home</Link>
              </li>
              <li className="p-4 md:text-xl">
                <Link to="/feed">About</Link>
              </li>
              <li className="p-4 md:text-xl">
                <Link to={"/recommend/" + user.id + "/" + user.domain + "/"}>
                  Projects
                </Link>
              </li>
              <li className="p-4 md:text-xl">Contact</li>
              <li className="p-4 md:text-xl">
                {/* <button

									id="dropdownInformationButton"
									data-dropdown-toggle="dropdownInformation"
									className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
									type="button"
								>
									Dropdown header{" "}
									<svg
										className="w-2.5 h-2.5 ml-2.5"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 10 6"
									>
										<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="m1 1 4 4 4-4"
										/>
									</svg>
								</button> */}
                {/* <div
									id="dropdownInformation"
									className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
								>
									<div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
										<div>Bonnie Green</div>
										<div className="font-medium truncate">
											name@flowbite.com
										</div>
									</div>
									<ul
										className="py-2 text-sm text-gray-700 dark:text-gray-200"
										aria-labelledby="dropdownInformationButton"
									>
										<li>
											<a
												href="#"
												className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
											>
												Dashboard
											</a>
										</li>
										<li>
											<a
												href="#"
												className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
											>
												Settings
											</a>
										</li>
										<li>
											<a
												href="#"
												className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
											>
												Earnings
											</a>
										</li>
									</ul>
									<div className="py-2">
										<a
											href="#"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
										>
											Sign out
										</a>
									</div>
								</div> */}

                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 group">
                      <div className="text-white group-hover:text-black">
                        <BiUserCircle size={25} />
                      </div>
                      <ChevronDownIcon
                        className="-mr-1 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={"/myprojects/" + user.id}
                              // onClick={
                              // 	handleLogout
                              // }
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              My Projects
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={"/add"}
                              // onClick={
                              // 	handleLogout
                              // }
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              New Project
                            </Link>
                          )}
                        </Menu.Item>

                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/dashboard"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Profile
                            </Link>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/"
                              onClick={handleLogout}
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Logout
                            </Link>
                          )}
                        </Menu.Item>
                        {/* <Menu.Item>
													{({ active }) => (
														<a
															href="#"
															className={classNames(
																active
																	? "bg-gray-100 text-gray-900"
																	: "text-gray-700",
																"block px-4 py-2 text-sm"
															)}
														>
															Move
														</a>
													)}
												</Menu.Item> */}
                      </div>
                      {/* <div className="py-1">
												<Menu.Item>
													{({ active }) => (
														<a
															href="#"
															className={classNames(
																active
																	? "bg-gray-100 text-gray-900"
																	: "text-gray-700",
																"block px-4 py-2 text-sm"
															)}
														>
															Share
														</a>
													)}
												</Menu.Item>
												<Menu.Item>
													{({ active }) => (
														<a
															href="#"
															className={classNames(
																active
																	? "bg-gray-100 text-gray-900"
																	: "text-gray-700",
																"block px-4 py-2 text-sm"
															)}
														>
															Add to favorites
														</a>
													)}
												</Menu.Item>
											</div>
											<div className="py-1">
												<Menu.Item>
													{({ active }) => (
														<a
															href="#"
															className={classNames(
																active
																	? "bg-gray-100 text-gray-900"
																	: "text-gray-700",
																"block px-4 py-2 text-sm"
															)}
														>
															Delete
														</a>
													)}
												</Menu.Item>
											</div> */}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </li>
            </>
          ) : (
            <div className="flex justify-center items-center gap-4">
              <li className="p-4 md:text-xl">
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
