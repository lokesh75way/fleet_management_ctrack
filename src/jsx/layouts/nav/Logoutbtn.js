import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import withRouter from "@/hoc/withRouter";
import { logout } from "@/store/silces/authSlice";

function LogoutPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onLogout() {
    dispatch(logout());
    navigate("/login");
  }
  return (
    <>
      <button className="btn btn-primary btn-sm" onClick={onLogout}>
        {t("logout")}
      </button>
    </>
  );
}

export default withRouter(LogoutPage);
