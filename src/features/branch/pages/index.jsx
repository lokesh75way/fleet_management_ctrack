import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";

import PermissionDenied from "@/components/PermissionDenied";
import usePermissions from "@/hooks/usePermissions";
import Error404 from "@/components/Error/Error404";
const BranchList = lazy(() => import("./List"));
const BranchForm = lazy(() => import("./Create"));

const routes = [
  {
    module: "branch",
    operation: "add",
    url: "/create",
    component: <BranchForm />,
  },
  {
    module: "branch",
    operation: "modify",
    url: "/edit/:id",
    component: <BranchForm />,
  },
  {
    module: "branch",
    operation: "view",
    url: "/",
    component: <BranchList />,
  },
  {
    module: "branch",
    operation: "view",
    url: "/cid/:cId",
    component: <BranchList />,
  },
];

const BranchPages = () => {
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

export default BranchPages;
