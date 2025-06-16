export type PresentRecommendation = {
	id: number;
	name: string;
	description: string;
	reason: string;
	image_url: string;
	price: string;
	shopping_link: string;
	mall_name: string;
	search_query: string;
	product_info: {
		brand: string;
		category1: string;
		category2: string;
		category3: string;
		hprice: string;
		image: string;
		link: string;
		lprice: string;
		maker: string;
		mallName: string;
		title: string;
	};
	alternative_products: [
		{
			brand: string;
			category1: string;
			category2: string;
			category3: string;
			hprice: string;
			image: string;
			link: string;
			lprice: string;
			maker: string;
			mallName: string;
			title: string;
		},
	];
	search_error: string;
};

export type PresentRecommendationResponse = {
	presents: PresentRecommendation[];
	letter: string;
};
