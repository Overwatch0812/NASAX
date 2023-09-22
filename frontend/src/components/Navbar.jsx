import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Analytics from "./Analytics";

const Navbar = () => {
	const [nav, setNav] = useState(false);

	return (
		<div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 pt-1 text-white bg-black1">
			<h1 className="w-full text-3xl font-bold text-[#00df9a]">
				<Link to="/">CampusX.</Link>
			</h1>
			<ul className="hidden md:flex uppercase">
				<li className="p-4 md:text-xl">
					<Link to="/">Home</Link>
				</li>
				{/* <li className="p-4 md:text-xl">Company</li> */}
				{/* <li className="p-4 md:text-xl">Resources</li> */}
				<li className="p-4 md:text-xl">
					<Link to="/">About</Link>
				</li>
				<li className="p-4 md:text-xl">Contact</li>
			</ul>
			<div className="block md:hidden">
				{nav ? (
					<AiOutlineClose size={20} onClick={() => setNav(false)} />
				) : (
					<AiOutlineMenu size={20} onClick={() => setNav(true)} />
				)}
			</div>
			{nav && (
				<ul className="fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500">
					<Link to="/">
						<button className="w-full text-3xl font-bold text-[#00df9a] m-4">
							CampusX.
						</button>
					</Link>
					<li className="p-4 border-b border-gray-600 uppercase">
						<Link to="/">
							<button>Home</button>
						</Link>
					</li>
					<li className="p-4 border-b border-gray-600 uppercase">
						<Link to={Analytics}>
							<button>About</button>
						</Link>
					</li>
					<li className="p-4">Contact</li>
				</ul>
			)}
		</div>
	);
};

export default Navbar;
