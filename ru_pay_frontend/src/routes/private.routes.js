import * as React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "@/pages/home";
import Navbar from "@/components/Navbar";
import PurchaseHistory from "@/pages/purchase-history";

const PrivateRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<PurchaseHistory />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Navbar>
    </BrowserRouter>
  );
};

export default PrivateRoutes;
