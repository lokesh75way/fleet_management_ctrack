import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import PermissionDenied from "@/components/PermissionDenied";
import { usePermissions } from "@/context/PermissionContext";
import BranchList from "./List";

const routes = [
  //   {
  //     module: "branch",
  //     operation: "add",
  //     url: "branch/create",
  //     component: <BranchForm />,
  //   },
  //   {
  //     module: "branch",
  //     operation: "modify",
  //     url: "branch/edit/:id",
  //     component: <BranchForm />,
  //   },
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
      <Route path="*" element={<Navigate to={"/not-found"} />} />
    </Routes>
  );
};

export default BranchPages;
