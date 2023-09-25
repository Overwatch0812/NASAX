import FeedCard from "./FeedCard";
import Search from "./Search";
export default function FeedPage() {
	return (
		<div className="max-w-[1200px]  mx-3 lg:mx-auto  flex flex-col text-white">
			<Search />
			<FeedCard />
		</div>
	);
}
