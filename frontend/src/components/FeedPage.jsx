import FeedCard from "./FeedCard";
import Search from "./Search";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { resetProject } from "../features/projects/projectSlice";
import { fetchProjectApiData } from "../features/projects/projectSlice";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

export default function FeedPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cardData, setCardData] = useState([]);

  const { user, isSuccess, isUserLoaded, IsError } = useSelector(
    (state) => state.auth
  );

  //

  useEffect(() => {
    if (isUserLoaded) {
      dispatch(fetchProjectApiData()).then((e) => setCardData(e.payload));
    }
  }, [isUserLoaded, user, IsError, isSuccess, dispatch, navigate]);

  return !cardData ? (
    <Spinner />
  ) : (
    <div className="max-w-[1200px]  mx-3 lg:mx-auto  flex flex-col text-white">
      <Search />
      <div
        className="my-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-6 lg:gap-7 xl:gap-8
			"
      >
        {cardData.map((project) => {
          return (
            <Link to={"/project/" + project.id} key={project.id}>
              <FeedCard {...project} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
