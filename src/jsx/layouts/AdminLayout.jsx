import React, { Suspense, useContext, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import Nav from "./nav";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  const { menuToggle, lang, setIsArabic } = useContext(ThemeContext);
  
  useEffect(() => {
    const root = document.getElementById("root");
    if (lang === "ar") {
      root.style.direction = "rtl";
      setIsArabic(true);
    } else {
      root.style.direction = "ltr";
      setIsArabic(false);
    }
  }, [lang, setIsArabic]);

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
          <Outlet />
        </div>
        {/* <Footer /> */}
      </div>
    </Suspense>
  );
}

export default AdminLayout;
