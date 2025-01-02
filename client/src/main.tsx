import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./index.css";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { QueryClient } from "@tanstack/react-query";
import TanstackQueryProvider from "@/context/tanstack-context";
import NotFound from "@/components/custom/not-found";
import DefaultCatchBoundary from "@/components/custom/default-catch-boundary";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultPendingComponent: () => (
    <div className="p-2 text-2xl">
      <p>Loading...</p>
    </div>
  ),
  defaultErrorComponent: DefaultCatchBoundary,
  defaultNotFoundComponent: NotFound,
  context: { queryClient, auth: undefined },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return <RouterProvider router={router} />;
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <TanstackQueryProvider queryClient={queryClient}>
        <App />
      </TanstackQueryProvider>
    </StrictMode>
  );
}
