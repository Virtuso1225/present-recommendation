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
		additionalProp1: Record<string, unknown>;
		additionalProp2: Record<string, unknown>;
		additionalProp3: Record<string, unknown>;
	};
	alternative_products: [
		{
			additionalProp1: Record<string, unknown>;
			additionalProp2: Record<string, unknown>;
			additionalProp3: Record<string, unknown>;
		},
	];
	search_error: string;
};

export type PresentRecommendationResponse = {
	present: PresentRecommendation[];
	letter: string;
};
