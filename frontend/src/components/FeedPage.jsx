import FeedCard from "./FeedCard";
import Search from "./Search";
import Sidebar from "./Sidebar";
export default function FeedPage() {
	return (
		<div className="max-w-[1200px] md:mx-auto flex flex-col mx-3 text-white">
			<Sidebar />
			<div className="max-w-[1200px] md:mx-auto bg-baseBG">
				<Search />
				<FeedCard />
			</div>
		</div>
	);
}
