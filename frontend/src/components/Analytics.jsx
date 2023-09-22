import { Link } from "react-router-dom";
import Laptop from "../assets/laptop.jpg";
export default function Analytics() {
	return (
		<div className="w-full bg-white py-16 px-4">
			<div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
				<img
					className="w-[500px] mx-auto my-4 animate-pulse"
					src={Laptop}
					alt="/"
				/>
				<div className="flex flex-col justify-center text-center md:text-left">
					<p className="text-[#00df9a] font-bold ">
						PROJECT COLLABORATION
					</p>
					<h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">
						Work On Project Together
					</h1>
					<p>
						An integrated platform should be developed where in all
						the universities/Colleges provide information about the
						projects done by the students. An integrated platform
						should be developed where in all the
						universities/Colleges provide information about the
						projects done by the students. The information on this
						platform will help in the peer learning and this will
						also help in cross functional research between various
						universities/colleges.
					</p>
					<Link to="/signup">
						<button className="bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3">
							Get Started
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
