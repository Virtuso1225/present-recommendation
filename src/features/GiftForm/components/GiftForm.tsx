import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useAppForm } from "@/hooks/form";
import { Send } from "lucide-react";
import { z } from "zod";

const genderValues = ["male", "female"] as const;
type Gender = (typeof genderValues)[number];

const schema = z.object({
	conversationFile: z.instanceof(File),
	gender: z.enum(genderValues),
	age: z.number().min(1, "나이를 입력해주세요"),
	budget: z.number().min(1, "예산을 입력해주세요"),
	relation: z.string().min(1, "선물을 주려는 대상과의 관계를 입력해주세요"),
	purpose: z.string().min(1, "선물 목적을 입력해주세요"),
});

const GiftForm = () => {
	const form = useAppForm({
		defaultValues: {
			gender: "male",
			age: 1,
			budget: 100000,
			conversationFile: new File([], ""),
			relation: "",
			purpose: "",
		},
		validators: {
			onBlur: schema,
		},
		onSubmit: ({ value }) => {
			console.log(value);
			alert("Form submitted successfully!");
		},
	});

	return (
		<div className="max-w-3xl mx-auto">
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
								max={1000}
								multiplier={1000}
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
				</form>
				<form.AppForm>
					<form.SubmitButton
						label="선물 추천 받기"
						prefix={<Send className="w-5 h-5" />}
					/>
				</form.AppForm>
			</Card>
		</div>
	);
};

export default GiftForm;
