import React, { lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import PermissionDenied from "@/components/PermissionDenied";
import usePermissions from "@/hooks/usePermissions";
const CompanyList = lazy(() => import("./List"));
const CompanyForm = lazy(() => import("./Create"));

const routes = [
  {
    module: "company",
    operation: "add",
    url: "/create",
    component: <CompanyForm />,
  },
  {
    module: "company",
    operation: "modify",
    url: "/edit/:id",
    component: <CompanyForm />,
  },
  {
    module: "company",
    url: "/gid/:groupId",
    operation: "view",
    component: <CompanyList />,
  },
  {
    module: "company",
    url: "/",
    operation: "view",
    component: <CompanyList />,
  },
];

const CompanyPages = () => {
  const { can } = usePermissions();

  return (
    <Routes>
      {routes.map((data, i) => {
        if (!can(data.module, data.operation)) {
          return (
            <Route
              key={i}
              exact
              path={`${data.url}`}
              element={<PermissionDenied />}
            />
          );
        }
        return (
          <Route key={i} exact path={`${data.url}`} element={data.component} />
        );
      })}
      <Route path="*" element={<Navigate to={"/not-found"} />} />
    </Routes>
  );
};

export default CompanyPages;
