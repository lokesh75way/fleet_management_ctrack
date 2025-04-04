import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import PermissionDenied from "@/components/PermissionDenied";
import usePermissions from "@/hooks/usePermissions";
import Error404 from "@/components/Error/Error404";
const TechnicianList = lazy(() => import("./List"));
const TechnicianFrom = lazy(() => import("./Create"));
const Tasks = lazy(() => import("./Tasks"));

const routes = [
  {
    module: "technician",
    url: "/",
    operation: "view",
    component: <TechnicianList />,
  },
  {
    module: "technician",
    url: "/edit/:id",
    operation: "modify",
    component: <TechnicianFrom />,
  },
  {
    module: "technician",
    url: "/create",
    operation: "add",
    component: <TechnicianFrom />,
  },
  {
    module: "technician/tasks",
    url: "/tasks",
    operation: "view",
    component: <Tasks />,
  },
];

const TechnicianPages = () => {
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

export default TechnicianPages;
