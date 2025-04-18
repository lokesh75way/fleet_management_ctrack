import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import PermissionDenied from "@/components/PermissionDenied";
import usePermissions from "@/hooks/usePermissions";
import Error404 from "@/components/Error/Error404";
import UnassinedVehicleList from "./Unassined";
const VehicleList = lazy(() => import("./List"));
const VehicleFrom = lazy(() => import("./Create"));
const DriverTracking = lazy(() => import("./Tracking"));

const routes = [
  {
    module: "vehicle",
    operation: "add",
    url: "/create",
    component: <VehicleFrom />,
  },
  {
    module: "vehicle",
    url: "/",
    operation: "view",
    component: <VehicleList />,
  },
  {
    module: "vehicle",
    operation: "modify",
    url: "/edit/:id",
    component: <VehicleFrom />,
  },
  {
    module: "vehicle-tracking",
    url: "/tracking",
    operation: "view",
    component: <DriverTracking />,
  },
  {
    module: "vehicle-tracking",
    operation: "view",
    url: "/tracking/:id",
    component: <DriverTracking />,
  },
  {
    module: "vehicle",
    operation: "view",
    url: "/unassigned",
    component: <UnassinedVehicleList />,
  },
];

const VehiclePages = () => {
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

export default VehiclePages;
