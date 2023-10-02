import FeedCard from "./FeedCard";
import Search from "./Search";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../features/projects/projectSlice";
import { fetchProjectApiData } from "../features/projects/projectSlice";
import { Link } from "react-router-dom";

export default function FeedPage() {
	const dispatch = useDispatch();
	const [cardData, setCardData] = useState([]);

	const { user, isSuccess } = useSelector((state) => state.auth);

	//

	// useEffect(() => {
	// 	if (isSuccess || user) {
	// 		dispatch(fetchProjectApiData()).then((e) => setCardData(e.payload));
	// 		console.log(cardData);
	// 	}
	// }, [user, isSuccess]);

	async function getCardData() {
		const res = await fetch("https://campusx-api.vercel.app/api/");
		const data = await res.json();
		console.log(data);
		setCardData(data);
	}
	useEffect(() => {
		getCardData();
	}, []);

	return !cardData ? (
		<h1 className="text-[#00df9a]">Data is Being Fetched</h1>
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
