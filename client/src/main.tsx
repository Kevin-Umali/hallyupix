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
import CustomLoader from "@/components/custom/custom-loader";
import { Toaster } from "sonner";

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
    <div className="flex items-center justify-center min-h-screen">
      <CustomLoader text="Getting your K-pop groove on..." />
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
  interface HistoryState {
    email?: string;
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
        <Toaster position="top-right" duration={5000} closeButton={true} />
      </TanstackQueryProvider>
    </StrictMode>
  );
}
