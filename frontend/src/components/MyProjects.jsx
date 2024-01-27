import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import FeedCard from "./FeedCard";
import Shimmer from "./Shimmer";
export default function MyProjects() {
  const { id } = useParams();
  const [cardData, setCardData] = useState([]);
  async function getCardData() {
    const url = "http://127.0.0.1:7000/api/projects/" + id + "/";
    const res = await fetch(url);
    const data = await res.json();
    setCardData(data);
    console.log(data);
  }
  useEffect(() => {
    getCardData();
    console.log(cardData);
  }, []);

  return (
    <>
      <div className="px-8 mx-3 lg:mx-auto my-2 text-white w-full flex flex-col">
        <h1 className="text-2xl font-semibold">Your Projects</h1>
        {cardData.length === 0 ? (
          <div>
            <Shimmer />
          </div>
        ) : (
          <div
            className="my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-6 lg:gap-7 xl:gap-8
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
        )}
      </div>
    </>
  );
}
