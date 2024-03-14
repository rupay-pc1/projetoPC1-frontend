import * as React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "@/pages/home";

const PrivateRoutes = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
  )
}

export default PrivateRoutes