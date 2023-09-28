import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
} from "react-router-dom";

import Signup from "./components/Signup";
import Login from "./components/Login";
import Activate from "./components/Activate";
import Homes from "./components/Homes";
import ResetPassword from "./components/ResetPassword";
import ResetPasswordConfirm from "./components/ResetPasswordConfirm";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FeedPage from "./components/FeedPage";
import Spinner from "./components/Spinner";
import PLS from "./components/plsActivate";
import ProjectDetail from "./components/ProjectDetail";

// TODO:Create Shimmer
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homes />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/lobby" element={<PLS />} />
        <Route path="/activate/:uid/:token" element={<Activate />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route
          path="/password/reset/confirm/:uid/:token"
          element={<ResetPasswordConfirm />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
