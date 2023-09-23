import { LuFolderSearch } from "react-icons/lu";

export default function Search() {
	return (
		<div className="w-full flex justify-between items-center my-3">
			<div className="">
				<h3 className="text-xl my-2">Home</h3>
			</div>
			<div className="bg-cardGrey flex gap-3 px-2 rounded-md">
				<input
					type="text"
					className="bg-cardGrey px-2 my-1 border-r-2 text-white"
					placeholder="Search Title"
				/>
				<button>
					<LuFolderSearch size={20} />
				</button>
			</div>
		</div>
	);
}
