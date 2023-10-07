import Typed from "react-typed";
import { Link } from "react-router-dom";
import Analytics from "./Analytics";
import Features from "./Features";
import NewsLetter from "./NewsLetter";
import Cards from "./Cards";
const Homes = () => {
	return (
		<>
			<div className="text-white bg-black1">
				<div className="max-w-[1000px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">
					<p className="text-[#00df9a] font-bold p-2">
						GROWING BY LEARNING
					</p>
					<h1 className="md:text-7xl sm:text-6xl text-4xl font-bold md:py-6">
						Grow with projects.
					</h1>
					<div className="flex justify-center items-center ">
						<p className="md:text-5xl sm:text-4xl text-xl font-bold py-4">
							Project Collaboration with
						</p>
						<Typed
							className="md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2"
							strings={["Innovators", "Researchers", "Scientist"]}
							typeSpeed={190}
							backSpeed={140}
							loop
						/>
					</div>
					<p className="md:text-2xl text-xl font-bold text-gray-500">
						Search for your intrest across all domains and all
						colleges.
					</p>
					<Link to="/signup">
						<button className="bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black">
							Get Started
						</button>
					</Link>
				</div>
			</div>
			<Analytics />
			<NewsLetter />
			<Features />
		</>
	);
};

export default Homes;
