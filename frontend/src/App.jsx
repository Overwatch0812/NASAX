import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Activate from "./components/Activate";
import Homes from "./components/Homes";
import ResetPassword from "./components/ResetPassword";
import ResetPasswordConfirm from "./components/ResetPasswordConfirm";


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
        <Layout>
          <RouterProvider router={router} />
        </Layout>
    </>
  );
}

export default App;
