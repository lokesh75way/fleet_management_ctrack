import React from "react";
import { connect, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Logout } from "../../../store/actions/AuthActions";
import { isAuthenticated } from "../../../store/selectors/AuthSelectors";
import { SVGICON } from "../../constant/theme";
import { useTranslation } from "react-i18next";
import { useLogout } from "@/hooks/useLogout";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

function LogoutPage(props) {
  const logout = useLogout();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function onLogout() {
    dispatch(Logout(navigate));
  }

  const { t } = useTranslation();
  return (
    <>
      <button
        className="dropdown-item ai-icon ms-1 logout-btn"
        onClick={logout}
      >
        {SVGICON.Logout} <span className="ms-2">{t("logout")} </span>
      </button>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated(state),
  };
};

export default withRouter(connect(mapStateToProps)(LogoutPage));
