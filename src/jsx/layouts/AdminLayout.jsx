import React, { Suspense, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import Nav from "./nav";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Loader from "@/components/Loader";

function AdminLayout() {
  const { menuToggle } = useContext(ThemeContext);
  const { lang, setIsArabic } = useContext(ThemeContext);
  if (lang == "ar") {
    document.getElementById("root").style.direction = "rtl";
    setIsArabic(true);
  } else {
    document.getElementById("root").style.direction = "ltr";
    setIsArabic(false);
  }
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
        <Nav role="admin" />
        <div
          className="content-body"
          // style={{ minHeight: window.screen.height - 45 }}
        >
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
        {/* <Footer /> */}
      </div>
    </Suspense>
  );
}

export default AdminLayout;
