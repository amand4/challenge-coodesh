// ** React Imports
import React from "react";
import ReactDOM from "react-dom/client";

// ** Third Party Imports
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ** Main App module Import
import App from "./App";

// ** Globals Imports
import "./globals.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 0,
      staleTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.Fragment>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.Fragment>,
);
