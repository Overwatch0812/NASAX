import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Signup from "./components/Signup";
import Login from "./components/Login";
import Activate from "./components/Activate";
import Homes from "./components/Homes";
import ResetPassword from "./components/ResetPassword";
import ResetPasswordConfirm from "./components/ResetPasswordConfirm";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Homes />,
		},
		{
			path: "/signup",
			element: <Signup />,
		},
		// {
		// 	path: "/home",
		// 	element: <Homes />,
		// },
		{
			path: "/login",
			element: <Login />,
		},
		{
			path: "/activate/:uid/:token",
			element: <Activate />,
		},
		{
			path: "/reset-password",
			element: <ResetPassword />,
		},
		{
			path: "/password/reset/confirm/:uid/:token",
			element: <ResetPasswordConfirm />,
		},
	]);

	return (
		<>
			<Navbar />
			<RouterProvider router={router} />
			<Footer />
		</>
	);
}

export default App;
