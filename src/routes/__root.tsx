import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import Header from "../components/Header";

import TanstackQueryLayout from "../integrations/tanstack-query/layout";

import type { QueryClient } from "@tanstack/react-query";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	component: () => (
		<div className="min-h-screen flex flex-col">
			<Header />
			<main className="flex-1 mt-16 mx-auto w-full bg-[#f8fafc]">
				<Outlet />
			</main>
			<TanStackRouterDevtools />
			<TanstackQueryLayout />
		</div>
	),
});
