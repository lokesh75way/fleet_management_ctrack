import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import PermissionDenied from "@/components/PermissionDenied";
import usePermissions from "@/hooks/usePermissions";
import Error404 from "@/components/Error/Error404";
const TemplateList = lazy(() => import("./List"));
const TemplateForm = lazy(() => import("./Create"));

// TODO: change module name from groups to template
const routes = [
  {
    module: "groups",
    operation: "add",
    url: "/create",
    component: <TemplateForm />,
  },
  {
    module: "groups",
    operation: "modify",
    url: "/edit/:id",
    component: <TemplateForm />,
  },
  {
    module: "groups",
    url: "/",
    operation: "view",
    component: <TemplateList />,
  },
];

const TemplatePages = () => {
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
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default TemplatePages;
