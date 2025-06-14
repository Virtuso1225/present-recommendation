import type { PresentRecommendationResponse } from "@/features/GiftForm/utils/type";
import { createFileRoute } from "@tanstack/react-router";
import useEmblaCarousel from "embla-carousel-react";
import {
	ChevronLeft,
	ChevronRight,
	ExternalLink,
	Gift,
	Heart,
	Mail,
	Share2,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/result/$data")({
	component: RouteComponent,
});

interface Recommendation {
	gifts: Array<{
		name: string;
		price: string;
		description: string;
		imageUrl: string;
		link?: string;
	}>;
	letter: string;
	reasons: string[];
}

function RouteComponent() {
	const { data } = Route.useParams();

	const results = JSON.parse(data) as PresentRecommendationResponse;
	console.log(results);

	const [emblaRef, emblaApi] = useEmblaCarousel({
		align: "start",
		containScroll: "trimSnaps",
	});

	const [recommendation, _] = useState<Recommendation>({
		gifts: [
			{
				name: "애플워치 SE",
				price: "359,000원",
				description: "건강 관리와 일상적인 활동을 추적하는 완벽한 동반자",
				imageUrl:
					"https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&q=80&w=600",
				link: "https://www.apple.com/kr/apple-watch-se/",
			},
			{
				name: "조 말론 향수",
				price: "198,000원",
				description: "우아하고 세련된 향기로 특별한 순간을 만들어주는 선물",
				imageUrl:
					"https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=600",
				link: "https://www.jomalone.co.kr/",
			},
			{
				name: "소니 WH-1000XM5 헤드폰",
				price: "429,000원",
				description:
					"최고급 노이즈 캔슬링과 뛰어난 음질을 제공하는 프리미엄 헤드폰",
				imageUrl:
					"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600",
				link: "https://www.sony.co.kr/electronics/headphones/wh-1000xm5",
			},
			{
				name: "몽블랑 사피아노 반지갑",
				price: "289,000원",
				description: "클래식한 디자인과 최고급 가죽으로 제작된 명품 지갑",
				imageUrl:
					"https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=600",
				link: "https://www.montblanc.com/",
			},
			{
				name: "다이슨 에어랩",
				price: "699,000원",
				description: "혁신적인 기술로 완성하는 프리미엄 헤어 스타일링",
				imageUrl:
					"https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&q=80&w=600",
				link: "https://www.dyson.co.kr/",
			},
		],
		letter:
			"항상 저를 위해 따뜻한 마음을 보여주셔서 감사합니다. 이 작은 선물이 제 마음을 전하는 데 도움이 되길 바랍니다.",
		reasons: [
			"일상 생활에서 실용적으로 사용할 수 있는 선물입니다.",
			"고급스러운 디자인으로 선물받는 분의 품격을 높여줄 수 있습니다.",
			"장기적으로 사용할 수 있는 내구성 있는 제품입니다.",
		],
	});

	const scrollPrev = () => emblaApi?.scrollPrev();
	const scrollNext = () => emblaApi?.scrollNext();

	const renderGiftCard = (gift: Recommendation["gifts"][0], index: number) => (
		<div key={index} className="group card overflow-hidden p-0 h-full">
			<div className="aspect-[4/3] overflow-hidden bg-gray-100">
				<img
					src={gift.imageUrl}
					alt={gift.name}
					className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
				/>
			</div>
			<div className="p-6">
				<h3 className="text-lg font-semibold">{gift.name}</h3>
				<p className="text-blue-500 font-medium mt-1">{gift.price}</p>
				<p className="text-gray-600 mt-2 text-sm leading-relaxed">
					{gift.description}
				</p>
				<div className="flex items-center space-x-4 mt-4">
					{gift.link && (
						<a
							href={gift.link}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
						>
							<ExternalLink className="w-4 h-4 mr-1.5" />
							구매하기
						</a>
					)}
					<button
						type="button"
						className="flex items-center text-sm text-gray-600 hover:text-gray-900"
					>
						<Share2 className="w-4 h-4 mr-1.5" />
						공유하기
					</button>
				</div>
			</div>
		</div>
	);
	return (
		<div className="space-y-8 max-w-5xl mx-auto">
			<div className="card p-8">
				<h2 className="text-2xl font-semibold mb-6 flex items-center">
					<Gift className="w-6 h-6 mr-2 text-blue-500" />
					추천 선물
				</h2>

				{/* Main recommendations */}
				<div className="grid md:grid-cols-2 gap-6 mb-8 mx-auto">
					{recommendation.gifts
						.slice(0, 2)
						.map((gift, index) => renderGiftCard(gift, index))}
				</div>

				{/* Carousel for additional recommendations */}
				<div className="relative mt-12">
					<h3 className="text-lg font-medium mb-4">다른 추천 선물</h3>
					<div className="overflow-hidden" ref={emblaRef}>
						<div className="flex gap-6">
							{recommendation.gifts.slice(2).map((gift, index) => (
								<div className="flex-[0_0_300px]" key={`${gift.name}`}>
									{renderGiftCard(gift, index + 2)}
								</div>
							))}
						</div>
					</div>
					<button
						type="button"
						onClick={scrollPrev}
						className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
					>
						<ChevronLeft className="w-5 h-5" />
					</button>
					<button
						type="button"
						onClick={scrollNext}
						className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
					>
						<ChevronRight className="w-5 h-5" />
					</button>
				</div>
			</div>

			<div className="card p-8">
				<h2 className="text-2xl font-semibold mb-6 flex items-center">
					<Mail className="w-6 h-6 mr-2 text-blue-500" />
					추천 편지
				</h2>
				<div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
					<p className="text-gray-700 whitespace-pre-line leading-relaxed">
						{recommendation.letter}
					</p>
				</div>
			</div>

			<div className="card p-8">
				<h2 className="text-2xl font-semibold mb-6 flex items-center">
					<Heart className="w-6 h-6 mr-2 text-blue-500" />
					추천 이유
				</h2>
				<ul className="space-y-4">
					{recommendation.reasons.map((reason, index) => (
						<li
							key={`${reason}`}
							className="flex items-start bg-gray-50 rounded-xl p-5 border border-gray-100"
						>
							<span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-3 font-medium text-sm">
								{index + 1}
							</span>
							<span className="text-gray-700 leading-relaxed">{reason}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
