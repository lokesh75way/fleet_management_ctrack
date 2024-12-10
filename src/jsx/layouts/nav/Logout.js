import React from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { SVGICON } from "@/constants/theme";
import { logout } from "@/store/silces/authSlice";
import withRouter from "@/hoc/withRouter";

function LogoutPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onLogout() {
    dispatch(logout());
    navigate("/login");
  }

  const { t } = useTranslation();
  return (
    <>
      <button
        className="dropdown-item ai-icon ms-1 logout-btn"
        onClick={onLogout}
      >
        {SVGICON.Logout} <span className="ms-2">{t("logout")} </span>
      </button>
    </>
  );
}

export default withRouter(LogoutPage);
