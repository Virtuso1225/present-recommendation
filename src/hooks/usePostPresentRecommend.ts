import type { FormValues } from "@/features/GiftForm/components/GiftForm";
import type { PresentRecommendationResponse } from "@/features/GiftForm/utils/type";
import { type MutationOptions, useMutation } from "@tanstack/react-query";
import ky from "ky";

const postPresentRecommend = async (data: FormValues) => {
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
		},
	);

	if (!response.ok) {
		throw new Error("Failed to fetch present recommendation");
	}

	return response.json();
};

type Props = MutationOptions<PresentRecommendationResponse, Error, FormValues>;

export const usePostPresentRecommend = (props: Props) => {
	return useMutation({
		...props,
		mutationFn: postPresentRecommend,
	});
};
