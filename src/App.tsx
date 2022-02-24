import * as React from "react";
import Container from "@mui/material/Container";
import Blocks from "./Blocks";
import { Outlet, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";

function Layout() {
  return (
    <Container maxWidth="sm">
      <Box mt={2}>
        <Outlet />
      </Box>
    </Container>
  );
}

function Transactions() {
  return <>Transactions</>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Blocks />} />
        <Route path="transactions" element={<Transactions />} />
      </Route>
    </Routes>
  );
}
