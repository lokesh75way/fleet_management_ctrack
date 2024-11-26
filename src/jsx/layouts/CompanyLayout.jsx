import React, { Suspense, useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import Nav from "./nav";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function CompanyLayout() {
  const { lang, setIsArabic } = useContext(ThemeContext);
  if (lang == "ar") {
    document.getElementById("root").style.direction = "rtl";
    setIsArabic(true);
  } else {
    document.getElementById("root").style.direction = "ltr";
    setIsArabic(false);
  }

  const { menuToggle } = useContext(ThemeContext);
  const { isArabic } = useContext(ThemeContext);
  const [langStyle, setLangStyle] = useState({
    minHeight: window.screen.height - 45,
  });

  useEffect(() => {
    if (isArabic) {
      setLangStyle({
        minHeight: window.screen.height - 45,
        marginRight: "15rem",
        marginLeft: "1rem",
      });
    } else {
      setLangStyle({ minHeight: window.screen.height - 45 });
    }
  }, [isArabic]);

  console.log("isarabic", isArabic);
  console.log("this is lang", langStyle);
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
        <div className="content-body" style={langStyle}>
          <Outlet />
        </div>
        {/* <Footer /> */}
      </div>
    </Suspense>
  );
}

export default CompanyLayout;
