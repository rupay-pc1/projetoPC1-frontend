import * as React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "@/pages/home";
import Navbar from "@/components/Navbar";
import MyTickets from "@/pages/my-tickets";

const PrivateRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-tickets" element={<MyTickets />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Navbar>
    </BrowserRouter>
  );
};

export default PrivateRoutes;
