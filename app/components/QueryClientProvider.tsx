"use client";
import { PropsWithChildren } from "react";
import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";

const client = new QueryClient();
function QueryClientProvider({ children }: PropsWithChildren) {
  return (
    <ReactQueryClientProvider client={client}>
      {children}
    </ReactQueryClientProvider>
  );
}

export default QueryClientProvider;
