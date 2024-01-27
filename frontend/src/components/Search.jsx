import { useEffect, useState } from "react";
import { LuFolderSearch } from "react-icons/lu";
import FeedPage from "./FeedPage";
import FeedCard from "./FeedCard";
import { Link } from "react-router-dom";
import Select from "react-select";
import Shimmer from "./Shimmer";
export default function Search() {
  const [cardData, setCardData] = useState([]);
  const [filteredCard, setFilteredCard] = useState(cardData);
  const [search, setSearch] = useState("");
  async function getCardData() {
    const res = await fetch("http://127.0.0.1:7000/api/");
    const data = await res.json();
    console.log(data);
    setCardData(data);
  }
  useEffect(() => {
    getCardData();
  }, []);
  useEffect(() => {
    setFilteredCard(cardData);
  }, [cardData]);

  // const searchList = (value, restaurantList) => {
  // 	if (value === "") {
  // 		return restaurantList;
  // 	}
  // 	return restaurantList.filter((restaurant) =>
  // 		restaurant.info.name.toLowerCase().includes(value.toLowerCase())
  // 	);
  // };

  return (
    <div className="mx-auto px-4 pt-1">
      <div className="px-4 w-full flex justify-between md:justify-evenly md:gap-[10rem] items-center my-3">
        <div className="text-white">
          <h3 className=" my-2 text-2xl font-semibold">Feedpage</h3>
        </div>
        <div className="bg-cardGrey flex gap-3 px-2 rounded-md md:w-1/3 md:justify-between">
          <input
            type="text"
            className="bg-cardGrey px-2 my-1 border-r-2 text-white md:basis-[95%]"
            placeholder="Search Title"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>
            <LuFolderSearch size={20} />
          </button>
        </div>
      </div>
      {filteredCard.length === 0 ? (
        <Shimmer />
      ) : (
        <div
          className="my-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-6 lg:gap-7 xl:gap-8 text-white
			"
        >
          {filteredCard
            .filter((project) => {
              return search.toLowerCase() === ""
                ? project
                : project.title.toLowerCase().includes(search.toLowerCase()) ||
                    project.domain
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    project.level_of_expertise_of_collaborator
                      .toLowerCase()
                      .includes(search.toLowerCase());
            })
            .map((project) => {
              return (
                <Link to={"/project/" + project.id} key={project.id}>
                  <FeedCard {...project} />
                </Link>
              );
            })}
        </div>
      )}
    </div>
  );
}
