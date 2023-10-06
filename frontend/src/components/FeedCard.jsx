import { useEffect } from "react";
import axios from "axios";

export default function FeedCard(props) {
	return (
		<div className="bg-cardGrey flex flex-col h-[500px] overflow-scroll no-scroll rounded-md">
			<img
				src={props.thumbnail}
				alt=""
				className=" h-[300px] object-cover"
			/>
			<div className="px-4 pb-4 flex flex-col gap-4">
				<h3 className="text-xl mt-3">{props.title}</h3>
				<h4>{props.description}</h4>

				<div className="self-end text-baseGreen">
					<p>{props.domain}</p>
				</div>
			</div>
		</div>
	);
}
