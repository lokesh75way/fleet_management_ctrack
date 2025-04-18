import React from "react";
import { Routes, Route } from "react-router-dom";

import PermissionDenied from "@/components/PermissionDenied";
import usePermissions from "@/hooks/usePermissions";
import Error404 from "@/components/Error/Error404";
const BusinessForm = React.lazy(() => import("./Create"));
const BusinessList = React.lazy(() => import("./List"));

const routes = [
  {
    module: "business",
    operation: "add",
    url: "/create",
    component: <BusinessForm />,
  },
  {
    module: "business",
    operation: "modify",
    url: "/edit/:id",
    component: <BusinessForm />,
  },
  {
    module: "business",
    operation: "view",
    url: "/",
    component: <BusinessList />,
  },
  //   { module: "business", url: "business-group", component: <BusinessUser /> },
  //   {
  //     module: "business",
  //     url: "business-group/:id",
  //     component: <BusinessUser />,
  //   },
];

const BusinessGroupPages = () => {
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

export default BusinessGroupPages;
