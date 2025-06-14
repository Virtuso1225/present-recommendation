import { Button } from "@/components/ui/button";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { AlertCircle } from "lucide-react";

export const Route = createFileRoute("/error")({
	component: RouteComponent,
});

function RouteComponent() {
	const router = useRouter();
	return (
		<div className="max-w-3xl mx-auto">
			<div className="min-h-[80vh] flex flex-col items-center justify-center">
				<div className="relative w-24 h-24 mb-8">
					<div className="absolute inset-0 rounded-full bg-red-50" />
					<div className="absolute inset-0 flex items-center justify-center text-red-500">
						<AlertCircle className="w-12 h-12" strokeWidth={1.5} />
					</div>
				</div>

				<div className="text-center max-w-md mx-auto space-y-4">
					<h2 className="text-2xl font-semibold text-gray-900">
						선물 추천에 실패했어요
					</h2>
					<p className="text-gray-500 leading-relaxed">
						일시적인 오류가 발생했습니다.
						<br />
						잠시 후 다시 시도해주세요.
					</p>

					<div className="pt-6 space-y-3">
						<Button
							type="button"
							onClick={() => router.navigate({ to: "/" })}
							className="cursor-pointer"
						>
							처음으로 돌아가기
						</Button>
					</div>
				</div>

				<div className="mt-12 p-6 rounded-xl max-w-md mx-auto">
					<h3 className="font-medium text-gray-900 mb-3">
						문제가 계속 발생한다면
					</h3>
					<ul className="text-sm text-gray-600 space-y-2">
						<li>• 업로드한 파일이 올바른 형식인지 확인해주세요</li>
						<li>• 인터넷 연결 상태를 확인해주세요</li>
						<li>• 잠시 후 다시 시도해주세요</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
