import GiftForm from "@/features/GiftForm/components/GiftForm";
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<div className="h-[calc(100vh-64px)] bg-[#f8fafc] flex justify-center">
			<main className="w-full pt-28 pb-16 px-6">
				<GiftForm />
			</main>
		</div>
	);
}
