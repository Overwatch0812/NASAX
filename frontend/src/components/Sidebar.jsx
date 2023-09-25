import { useState } from "react";
import { BiUserCircle } from "react-icons/bi";

export default function Sidebar() {
	const [more, setMore] = useState(false);
	const handleChange = () => {
		setMore(!more);
	};
	return (
		<div>
			<h3 className="text-2xl font-semibold my-2">Projects</h3>
			<div className="w-full px-3 py-5 border border-cardGrey rounded-md">
				<ul className="list-none flex flex-col gap-1">
					<li className="flex gap-2 items-center">
						<BiUserCircle size={20} color="#7d8590" />
						ReactLearnings WiseyXD/ReactLearnings
					</li>
					<li>JavaScript20DaysChallenge</li>
					<li>WiseyXD/JavaScript20DaysChallenge youtube-clone</li>
					<li>WiseyXD/youtube-clone Smart-India-Hackathon</li>
					<li>Overwatch0812/Smart-India-Hackathon nasa-app</li>
					<li>WiseyXD/nasa-app AlumTrack Overwatch0812/AlumTrack</li>
					<li>Backend-Learnings WiseyXD/Backend-Learnings</li>
					{more && (
						<>
							<li>ReactLearnings WiseyXD/ReactLearnings</li>
							<li>JavaScript20DaysChallenge</li>
							<li>
								WiseyXD/JavaScript20DaysChallenge youtube-clone
							</li>
							<li>WiseyXD/youtube-clone Smart-India-Hackathon</li>
						</>
					)}
				</ul>
				<span></span>
				<button className="text-cardGrey mt-3" onClick={handleChange}>
					{more ? <span> Show Less</span> : <span>Show More</span>}
				</button>
			</div>
		</div>
	);
}
