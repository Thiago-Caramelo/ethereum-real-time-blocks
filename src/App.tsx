import * as React from "react";
import Container from "@mui/material/Container";
import Blocks from "./Blocks";
import { Outlet, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import Transactions from "./Transactions";

function Layout() {
  return (
    <Container maxWidth="sm">
      <Box mt={2}>
        <Outlet />
      </Box>
    </Container>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Blocks />} />
        <Route path="blocks/:id/transactions" element={<Transactions />} />
      </Route>
    </Routes>
  );
}
