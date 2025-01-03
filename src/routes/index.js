import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import About from "../pages/About";
import Home from "../pages/Home";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Routes with MainLayout */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route
        path="/about"
        element={
          <MainLayout>
            <About />
          </MainLayout>
        }
      />
      {/* Standalone Routes */}
      <Route path="/overview" element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;
