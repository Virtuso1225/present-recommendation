import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
	const navigate = useNavigate();

	return (
		<div className="min-h-[80vh] bg-[#f8fafc] flex flex-col">
			{/* Main Content */}
			<main className="flex-1 flex items-center justify-center px-16">
				<div className="text-center max-w-2xl mx-auto">
					{/* 404 Illustration */}
					<div className="relative mb-12">
						<div className="text-[8rem] font-bold text-gray-100 leading-none select-none">
							404
						</div>
						<div className="absolute inset-0 flex items-center justify-center">
							<span className="text-6xl">🚧</span>
						</div>
					</div>

					{/* Content */}
					<div className="space-y-6">
						<div className="space-y-3">
							<h1 className="text-2xl font-bold text-gray-900">
								페이지를 찾을 수 없어요
							</h1>
							<p className="text-md text-gray-600 leading-relaxed">
								요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
								<br />
								URL을 다시 확인해주세요.
							</p>
						</div>

						{/* Action Buttons */}
						<div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
							<Link to="/">
								<Button size="lg">
									<Home className="w-5 h-5" />
									홈으로 돌아가기
								</Button>
							</Link>

							<Button
								onClick={() => navigate({ to: "." })}
								size="lg"
								variant="outline"
							>
								<ArrowLeft className="w-5 h-5" />
								이전 페이지로
							</Button>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default NotFound;
