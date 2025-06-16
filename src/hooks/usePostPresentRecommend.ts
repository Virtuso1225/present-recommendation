import type { FormValues } from "@/features/GiftForm/components/GiftForm";
import type { PresentRecommendationResponse } from "@/features/GiftForm/utils/type";
import { type MutationOptions, useMutation } from "@tanstack/react-query";
import ky from "ky";

export const postPresentRecommend = async (data: FormValues) => {
	const formData = new FormData();
	formData.append("file", data.conversationFile);
	formData.append("age", data.age.toString());
	formData.append("budget", data.budget.toString());
	formData.append("relation", data.relation);
	formData.append("purpose", data.purpose);

	const response = await ky.post<PresentRecommendationResponse>(
		"https://present-recommendation.fly.dev/api/generate",
		{
			body: formData,
			timeout: 1000 * 30,
		},
	);

	if (!response.ok) {
		throw new Error("Failed to fetch present recommendation");
	}

	return response.json();
};

type Props = MutationOptions<PresentRecommendationResponse, Error, FormValues>;

export const dummyFn = async (
	data: FormValues,
): Promise<PresentRecommendationResponse> => {
	console.log(data);
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				presents: [
					{
						id: 1,
						name: "test",
						price: "10000",
						description: "test",
						image_url: "https://via.placeholder.com/150",
						reason: "test",
						shopping_link: "https://www.google.com",
						mall_name: "test",
						search_query: "test",
						product_info: {
							brand: "test",
							category1: "test",
							category2: "test",
							category3: "test",
							hprice: "10000",
							image: "https://via.placeholder.com/150",
							link: "https://www.google.com",
							lprice: "10000",
							maker: "test",
							mallName: "test",
							title: "test",
						},
						alternative_products: [
							{
								brand: "test",
								category1: "test",
								category2: "test",
								category3: "test",
								hprice: "10000",
								image: "https://via.placeholder.com/150",
								link: "https://www.google.com",
								lprice: "10000",
								maker: "test",
								mallName: "test",
								title: "test",
							},
						],
						search_error: "test",
					},
				],
				letter:
					"항상 저를 위해 따뜻한 마음을 보여주셔서 감사합니다. 이 작은 선물이 제 마음을 전하는 데 도움이 되길 바랍니다.",
			});
		}, 2000);
	});
};
export const usePostPresentRecommend = (props: Props) => {
	return useMutation({
		...props,
		mutationFn: postPresentRecommend,
	});
};
