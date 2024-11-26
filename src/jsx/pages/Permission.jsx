import React, { useState } from "react";
import MainPagetitle from "../layouts/MainPagetitle";
import Tabs from "../components/Tabs";
import { FaUser, FaBuilding } from "react-icons/fa";
import PermissionRules from "../components/Permission/PermissionRules";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Permission = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { isEditTrue, setIsEditTrue } = JSON.parse(location.state);
  console.log(isEditTrue, setIsEditTrue);
  const data = [
    {
      title: "Permission",
      component: (
        <PermissionRules
          isEditTrue={isEditTrue}
          setIsEditTrue={setIsEditTrue}
        />
      ),
      icon: <FaUser />,
    },
  ];
  return (
    <>
      <MainPagetitle
        mainTitle={t("permission")}
        pageTitle={t("permission")}
        parentTitle={t("Feature Templates")}
      />
      <Tabs tabs={data} />
    </>
  );
};

export default Permission;
