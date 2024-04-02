import * as React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "@/pages/login";
import Register from "@/pages/register";

const PublicRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PublicRoutes;
