import React, { Suspense, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import Nav from "./admin-nav";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  const { menuToggle } = useContext(ThemeContext);
  return (
    <Suspense
      fallback={
        <div id="preloader">
          <div className="sk-three-bounce">
            <div className="sk-child sk-bounce1"></div>
            <div className="sk-child sk-bounce2"></div>
            <div className="sk-child sk-bounce3"></div>
          </div>
        </div>
      }
    >
      <div
        id="main-wrapper"
        className={`show ${menuToggle ? "menu-toggle" : ""}`}
      >
        <Nav />
        <div
          className="content-body"
          style={{ minHeight: window.screen.height - 45 }}
        >
          <Outlet />
        </div>
        <Footer />
      </div>
    </Suspense>
  );
}

export default AdminLayout;
