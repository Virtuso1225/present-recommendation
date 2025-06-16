import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useAppForm } from "@/hooks/form";
import { usePostPresentRecommend } from "@/hooks/usePostPresentRecommend";
import { useRouter } from "@tanstack/react-router";
import { Send, Sparkles } from "lucide-react";
import { z } from "zod";

const genderValues = ["male", "female"] as const;

const schema = z.object({
	conversationFile: z.instanceof(File),
	gender: z.enum(genderValues),
	age: z.number().min(1, "나이를 입력해주세요"),
	budget: z.number().min(1, "예산을 입력해주세요"),
	relation: z.string().min(1, "선물을 주려는 대상과의 관계를 입력해주세요"),
	purpose: z.string().min(1, "선물 목적을 입력해주세요"),
});

export type FormValues = z.infer<typeof schema>;

const GiftForm = () => {
	const router = useRouter();
	const { mutate: postPresentRecommend, isPending } = usePostPresentRecommend({
		onSuccess: (data) => {
			router.navigate({
				to: "/result/$data",
				params: { data: JSON.stringify(data) },
			});
		},
		onError: () => {
			router.navigate({ to: "/error" });
		},
	});
	const form = useAppForm({
		defaultValues: {
			gender: "male",
			age: 1,
			budget: 0,
			conversationFile: new File([], ""),
			relation: "",
			purpose: "",
		},
		validators: {
			onSubmit: schema,
		},
		onSubmit: ({ value }) => {
			console.log(value);
			postPresentRecommend(value as FormValues);
		},
	});

	const renderLoadingState = () => (
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

	return (
		<div className="max-w-3xl mx-auto">
			{isPending ? (
				renderLoadingState()
			) : (
				<Card className="space-y-8 p-8">
					<CardHeader className="px-0">
						<CardTitle className="text-2xl font-semibold">
							선물 추천 받기
						</CardTitle>
						<CardDescription>
							AI가 대화 내용을 분석하여 최적의 선물을 추천해드려요
						</CardDescription>
					</CardHeader>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							console.log(form.state.values);
							form.handleSubmit();
						}}
						className="space-y-4"
					>
						<form.AppField name="conversationFile">
							{(field) => (
								<field.FileUpload
									label="대화 내용"
									placeholder={
										<>
											<p className="mb-2 text-sm text-gray-600">
												<span className="font-semibold">클릭</span>하여 파일을
												업로드하거나 드래그 앤 드롭하세요
											</p>
											<p className="text-xs text-gray-500">
												TXT 파일 (최대 10MB)
											</p>
										</>
									}
								/>
							)}
						</form.AppField>
						<div className="flex flex-row gap-4">
							<form.AppField name="gender">
								{(field) => (
									<field.Select
										className="w-1/2"
										label="성별"
										values={[
											{ label: "여성", value: "female" },
											{ label: "남성", value: "male" },
										]}
									/>
								)}
							</form.AppField>
							<form.AppField name="age">
								{(field) => (
									<field.NumberField
										className="w-1/2"
										label="나이"
										placeholder="나이를 입력해주세요"
									/>
								)}
							</form.AppField>
						</div>
						<form.AppField name="budget">
							{(field) => (
								<field.Slider
									label="예산"
									min={0}
									max={100}
									multiplier={10000}
									unit="₩"
								/>
							)}
						</form.AppField>
						<form.AppField name="relation">
							{(field) => (
								<field.TextField
									label="관계"
									placeholder="예: 직장 상사, 친구, 연인, 부모님"
								/>
							)}
						</form.AppField>
						<form.AppField name="purpose">
							{(field) => (
								<field.TextField
									label="선물 목적"
									placeholder="예: 생일, 기념일, 감사 인사"
								/>
							)}
						</form.AppField>
						<form.AppForm>
							<form.SubmitButton
								label="선물 추천 받기"
								prefix={<Send className="w-5 h-5" />}
							/>
						</form.AppForm>
					</form>
				</Card>
			)}
		</div>
	);
};

export default GiftForm;
