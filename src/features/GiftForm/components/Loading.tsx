import { Sparkles } from "lucide-react";

const Loading = () => {
	return (
		<div className="min-h-[80vh] flex flex-col items-center justify-center">
			<div className="relative w-24 h-24">
				<div
					className="absolute inset-0 rounded-full inline-block box-border animate-spin"
					style={{
						borderTop: "3px solid #4B7BF5",
						borderRight: "3px solid transparent",
					}}
				/>
				<div className="absolute inset-0 flex items-center justify-center text-[#4B7BF5]">
					<Sparkles className="w-8 h-8" strokeWidth={1.5} />
				</div>
			</div>
			<h2 className="mt-8 text-2xl font-semibold text-gray-900">
				AI가 최적의 선물을 찾고 있어요
			</h2>
			<div className="mt-4 space-y-2 text-center text-gray-500">
				<p>대화 내용을 분석하고</p>
				<p>취향과 상황에 맞는 선물을 찾고</p>
				<p>마음을 담은 편지도 작성하고 있어요</p>
			</div>
		</div>
	);
};

export default Loading;
