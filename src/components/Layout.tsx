import React from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";

const Layout: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
