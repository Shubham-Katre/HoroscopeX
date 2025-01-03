import React from "react";
import Navbar from "../components/Navbar";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="container">{children}</div>
    </>
  );
};

export default MainLayout;
