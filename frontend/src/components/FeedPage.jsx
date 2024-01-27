import FeedCard from "./FeedCard";
import Search from "./Search";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { resetProject } from "../features/projects/projectSlice";
import { fetchProjectApiData } from "../features/projects/projectSlice";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Shimmer from "./Shimmer";
import { recommend } from "../features/recommend/recommendSlice";

export default function FeedPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cardData, setCardData] = useState([]);
  const [revCardData, setRevCardData] = useState([]);
  // const { user, isSuccess } = useSelector((state) => state.auth);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  //

  const { user, isSuccess, isUserLoaded } = useSelector((state) => state.auth);
  const { isRecommend, IsError } = useSelector(
    (state) => state.recommendations
  );

  useEffect(() => {
    if (isUserLoaded) {
      dispatch(fetchProjectApiData()).then((e) => setCardData(e.payload));
      dispatch(recommend(user.id)).then((e) => setRevCardData(e.payload.b));
    }
  }, [isUserLoaded, user, IsError, isSuccess, dispatch, navigate]);

  async function getCardData() {
    const res = await fetch("http://127.0.0.1:7000/api/");
    const data = await res.json();
    setCardData(data);
  }
  useEffect(() => {
    getCardData();
  }, []);
  console.log(revCardData);

  //
  // return <h1>hello</h1>;
  return revCardData.length === 0 ? (
    <div className="px-8 mx-3 lg:mx-auto my-4 text-white w-full flex flex-col gap-8">
      <Shimmer />
    </div>
  ) : (
    <div className="px-8 mx-3 lg:mx-auto my-4 text-white w-full flex flex-col gap-8">
      {/* <Search /> */}
      <div>
        <div className="flex w-full justify-center lg:justify-start my-3">
          <h1 className="text-2xl font-semibold">Trending Projects</h1>
        </div>
        <Carousel responsive={responsive} itemClass="pr-6">
          {cardData.map((project) => {
            return (
              <Link to={"/project/" + project.id} key={project.id}>
                <FeedCard {...project} />
              </Link>
            );
          })}
        </Carousel>
      </div>
      <div>
        {revCardData.length === 0 ? (
          <div className="flex w-full justify-center lg:justify-start my-3">
            {/* <Shimmer /> */}
          </div>
        ) : (
          <>
            <div className="flex w-full justify-center lg:justify-start my-3">
              <h1 className="text-2xl font-semibold">Recommended For You </h1>
            </div>
            <Carousel responsive={responsive} itemClass="pr-6">
              {revCardData.map((project) => {
                return (
                  <Link to={"/project/" + project.id} key={project.id}>
                    <FeedCard {...project} />
                  </Link>
                );
              })}
            </Carousel>
          </>
        )}
      </div>
      {/* <div
				className="my-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-6 lg:gap-7 xl:gap-8
			"
			>
				{cardData.map((project) => {
					return (
						<Link to={"/project/" + project.id} key={project.id}>
							<FeedCard {...project} />
						</Link>
					);
				})}
			</div> */}
    </div>
  );
}
