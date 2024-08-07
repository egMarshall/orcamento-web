"use client";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const ReactQueryProvider = (props: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
