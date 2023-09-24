import Single from "../assets/single.png";
import Double from "../assets/double.png";
import Triple from "../assets/triple.png";
import { Link } from "react-router-dom";
import { TbReportSearch } from "react-icons/tb";
import { HiOutlineDocumentReport } from "react-icons/hi";
import Select from "react-select";
export default function Cards() {
	return (
		<div className="w-full py-[8rem] px-4 bg-white">
			<div className="max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8">
				<div className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
					<div className="w-20 mx-auto mt-[-3rem] bg-white flex justify-center">
						<TbReportSearch size={50} />
					</div>
					{/* <h2 className="text-2xl font-bold text-center py-8">
						Plagirism Checker
					</h2> */}
					<p className="text-center text-3xl font-bold py-8">
						Plagirism Checker
					</p>
					<p className="text-center text-lg font-semibold">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Ab natus eos laborum odit, debitis porro. Quis
						distinctio excepturi exercitationem dolore ducimus
						repellat vero esse perspiciatis.
					</p>
					<Link to="/signup" className="text-center">
						<button className="bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3">
							Get Started
						</button>
					</Link>
				</div>
				<div className="w-full shadow-xl bg-gray-100 flex flex-col p-4 md:my-0 my-8 rounded-lg hover:scale-105 duration-300">
					<img
						className="w-20 mx-auto mt-[-3rem] bg-white"
						src={Triple}
						alt="/"
					/>
					<p className="text-center text-3xl font-bold py-8">
						Discovery
					</p>
					<p className="text-center text-lg font-semibold">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Ab natus eos laborum odit, debitis porro. Quis
						distinctio excepturi exercitationem dolore ducimus
						repellat vero esse perspiciatis.
					</p>
					<Link to="/signup" className="text-center">
						<button className="bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3">
							Get Started
						</button>
					</Link>
				</div>
				<div className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
					<div className="w-20 mx-auto mt-[-3rem] bg-white flex justify-center">
						<HiOutlineDocumentReport size={50} />
					</div>
					{/* <h2 className="text-2xl font-bold text-center py-8">
						Plagirism Checker
					</h2> */}
					<p className="text-center text-3xl font-bold py-8">
						Report Summarizer
					</p>
					<p className="text-center text-lg font-semibold">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Ab natus eos laborum odit, debitis porro. Quis
						distinctio excepturi exercitationem dolore ducimus
						repellat vero esse perspiciatis.
					</p>
					<Link to="/signup" className="text-center">
						<button className="bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3">
							Get Started
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
