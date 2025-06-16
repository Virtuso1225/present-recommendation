import { Link } from "@tanstack/react-router";
import { Gift } from "lucide-react";

export default function Header() {
	return (
		<header className="bg-white/70 backdrop-blur-xl fixed w-full top-0 z-50 border-b border-gray-100">
			<div className="max-w-5xl mx-auto px-6 h-16 flex items-center">
				<Link to="/">
					<div className="flex items-center space-x-2.5">
						<Gift className="w-6 h-6 text-blue-500" />
						<span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
							Gift Box
						</span>
					</div>
				</Link>
			</div>
		</header>
	);
}
