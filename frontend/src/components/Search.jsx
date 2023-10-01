import { LuFolderSearch } from "react-icons/lu";
import Select from "react-select";
export default function Search() {
	return (
		<div className="max-w-[1200px] w-full flex justify-between md:justify-evenly md:gap-[10rem] items-center my-3">
			<div className="">
				<h3 className=" my-2 text-2xl font-semibold">Feed</h3>
			</div>
			<div className="bg-cardGrey flex gap-3 px-2 rounded-md md:w-1/3 md:justify-between">
				<input
					type="text"
					className="bg-cardGrey px-2 my-1 border-r-2 text-white md:basis-[95%]"
					placeholder="Search Title"
				/>
				<button>
					<LuFolderSearch size={20} />
				</button>
			</div>
		</div>
	);
}
