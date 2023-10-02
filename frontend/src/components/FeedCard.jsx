import { useEffect } from "react";
import axios from "axios";

export default function FeedCard(props) {
	return (
		<div className=" flex flex-col h-[350px] overflow-scroll no-scroll">
			<img src={props.thumbnail} alt="" className="rounded-t-md" />
			<div className="flex flex-col gap-3">
				<div>
					<p>{props.author}</p>
				</div>
				<div>
					<p>{props.domain}</p>
				</div>
			</div>
			<h3>{props.title}</h3>
			<h4>{props.description}</h4>
		</div>
	);
}
