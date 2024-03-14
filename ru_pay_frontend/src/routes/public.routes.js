import * as React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from "@/pages/login";
import Register from "@/pages/register";

const PublicRoutes = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
  )
}

export default PublicRoutes