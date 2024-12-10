import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import PermissionDenied from "@/components/PermissionDenied";
import usePermissions from "@/hooks/usePermissions";
import Error404 from "@/components/Error/Error404";
const DriverList = lazy(() => import("./List"));
const DriverForm = lazy(() => import("./Create"));

const routes = [
  {
    module: "driver",
    operation: "add",
    url: "/create",
    component: <DriverForm />,
  },
  {
    module: "driver",
    url: "/",
    operation: "view",
    component: <DriverList />,
  },
  {
    module: "driver",
    operation: "modify",
    url: "/edit/:id",
    component: <DriverForm />,
  },
];

const DriverPages = () => {
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

export default DriverPages;
