import * as React from "react";
import Container from "@mui/material/Container";
import Blocks from "./Blocks";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Container maxWidth="sm">
        <Blocks />
      </Container>
    </QueryClientProvider>
  );
}
