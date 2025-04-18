import React from "react";
import { useTranslation } from "react-i18next";

import { FaUser } from "react-icons/fa";
import MainPagetitle from "@/components/MainPagetitle";
import Tabs from "@/components/Tabs";
import PermissionForm from "../components/PermissionForm";

const CreateTemplate = () => {
  const { t } = useTranslation();

  const data = [
    {
      title: "Permission",
      component: <PermissionForm />,
      icon: <FaUser />,
    },
  ];
  return (
    <>
      <MainPagetitle
        mainTitle={t("permission")}
        pageTitle={t("permission")}
        parentTitle={t("featureTemplates")}
      />
      <Tabs tabs={data} />
    </>
  );
};

export default CreateTemplate;
