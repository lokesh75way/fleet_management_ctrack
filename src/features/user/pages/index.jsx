import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import PermissionDenied from "@/components/PermissionDenied";
import usePermissions from "@/hooks/usePermissions";
import Error404 from "@/components/Error/Error404";
const UserList = lazy(() => import("./List"));
const UserForm = lazy(() => import("./Create"));

const routes = [
  {
    module: "subUser",
    operation: "add",
    url: "/create",
    component: <UserForm />,
  },
  {
    module: "subUser",
    url: "/",
    operation: "view",
    component: <UserList />,
  },
  {
    module: "subUser",
    operation: "modify",
    url: "/edit/:id",
    component: <VehicleFrom />,
  },
];

const UserPages = () => {
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

export default UserPages;
