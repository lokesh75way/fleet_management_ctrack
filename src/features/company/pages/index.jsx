import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { usePermissions } from "@/context/PermissionContext";
import PermissionDenied from "@/components/PermissionDenied";

const routes = [
  //   {
  //     module: "company",
  //     operation: "add",
  //     url: "/create",
  //     component: <CompanyForm />,
  //   },
  //   {
  //     module: "company",
  //     operation: "modify",
  //     url: "/edit/:id",
  //     component: <CompanyForm />,
  //   },
  //   { module: "company", url: "/gid/:id", component: <Company /> },
  //   { module: "company", url: "/", component: <Company /> },
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
