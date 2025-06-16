import { Card } from "@/components/ui/card";
import type { PresentRecommendationResponse } from "@/features/GiftForm/utils/type";
import { createFileRoute } from "@tanstack/react-router";
import useEmblaCarousel from "embla-carousel-react";
import {
	BadgeInfo,
	ChevronLeft,
	ChevronRight,
	Copy,
	ExternalLink,
	Gift,
	Lightbulb,
	Mail,
	Share2,
} from "lucide-react";

export const Route = createFileRoute("/result/$data")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data } = Route.useParams();

	const results = JSON.parse(data) as PresentRecommendationResponse;
	console.log(results);

	const [emblaRef, emblaApi] = useEmblaCarousel({
		align: "start",
		containScroll: "trimSnaps",
	});

	const scrollPrev = () => emblaApi?.scrollPrev();
	const scrollNext = () => emblaApi?.scrollNext();

	const handleCopy = () => {
		navigator.clipboard.writeText(results.letter);
	};

	const alternativeProducts = results.presents.flatMap((gift) => {
		return gift.alternative_products.map((product) => {
			return {
				image_url: product.image,
				name: product.title,
				price: `${Number(product.lprice).toLocaleString()}원`,
				shopping_link: product.link,
				description: product.title,
				reason: product.title,
			};
		});
	});
	const renderGiftCard = (
		gift: {
			image_url: string;
			name: string;
			price: string;
			shopping_link: string;
			description: string;
			reason: string;
		},
		index: number,
	) => (
		<div key={index} className="group card overflow-hidden p-0 h-full">
			<div className="aspect-[4/3] overflow-hidden bg-gray-100">
				<img
					src={gift.image_url}
					alt={gift.name}
					className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
				/>
			</div>
			<div className="pt-6">
				<h3 className="text-lg font-semibold">{gift.name}</h3>
				<p className="text-blue-500 font-medium mt-1">{gift.price}</p>
				<p className="text-gray-600 mt-2 text-sm leading-relaxed flex items-center">
					<BadgeInfo className="w-4 h-4 mr-1.5" />
					{gift.description}
				</p>
				<div className="flex items-center space-x-2 mt-4">
					<Lightbulb className="w-4 h-4 mr-1.5" />
					<p className="text-gray-600 text-sm leading-relaxed">{gift.reason}</p>
				</div>
				<div className="flex items-center space-x-4 mt-4">
					{gift.shopping_link && (
						<a
							href={gift.shopping_link}
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
					{results.presents
						.slice(0, 2)
						.map((gift, index) => renderGiftCard(gift, index))}
				</div>

				{/* Carousel for additional recommendations */}
				<div className="relative mt-12">
					<h3 className="text-lg font-medium mb-4">다른 추천 선물</h3>
					<div className="overflow-hidden" ref={emblaRef}>
						<div className="flex gap-6">
							{[...results.presents.slice(2), ...alternativeProducts].map(
								(gift, index) => (
									<div className="flex-[0_0_300px]" key={`${gift.name}`}>
										{renderGiftCard(gift, index + 2)}
									</div>
								),
							)}
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

			<div className="card p-8 mb-8">
				<h2 className="text-2xl font-semibold mb-6 flex items-center">
					<Mail className="w-6 h-6 mr-2 text-blue-500" />
					추천 편지
				</h2>
				<Card className="flex flex-row justify-center items-center p-4">
					<p className="text-gray-700 whitespace-pre-line leading-relaxed">
						{results.letter}
					</p>
					<Copy
						className="flex-shrink-0 w-4 h-4 text-gray-500 cursor-pointer"
						onClick={handleCopy}
					/>
				</Card>
			</div>

			{/* <div className="card p-8">
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
			</div> */}
		</div>
	);
}
