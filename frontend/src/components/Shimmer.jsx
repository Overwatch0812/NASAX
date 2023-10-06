import ShimmerCard from "./ShimmerCard";
const Shimmer = () => {
	return (
		<div className="flex gap-3">
			{Array(8)
				.fill("")
				.map((ele, i) => (
					<ShimmerCard key={i} />
				))}
		</div>
	);
};

export default Shimmer;
