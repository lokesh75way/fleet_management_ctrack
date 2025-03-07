import React, { createContext, useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
const PermissionContext = createContext();

export function usePermissions() {
  return useContext(PermissionContext);
}

export function PermissionProvider({ children }) {
  const [permissionsByModuleId, setPermissionsByModuleId] = useState({});
  const [permissionsByBasePath, setPermissionsByBasePath] = useState({});
  // need to access store/storage and set user permissions
  const state = useSelector((state) => state);
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  // const permissions = state?.auth?.permission[0]
  // const [userPermission, setUserPermission] = useState(permissions || [])
  const permissions = JSON.parse(localStorage.getItem("permission"));
  const [userPermission, setUserPermission] = useState(
    permissions?.[0]?.permission || []
  );
  // Function to transform permissions array into object format to get quicker access
  const transformPermissions = (userPermission, field) => {
    const permissionsByModuleId = {};
    const permissionsByBasePath = {};
    (userPermission ?? []).forEach((permission) => {
      // permissionsByModuleId[data?.moduleId?.moduleId] = permission.permission;
      permissionsByBasePath[permission?.moduleId?.basePath] = permission;
      return;
    });

    setPermissionsByModuleId(permissionsByModuleId);
    setPermissionsByBasePath(permissionsByBasePath);
  };

  useEffect(() => {
    transformPermissions(userPermission);
  }, [userPermission]);

  const role = userDetails?.user?.role;

  const can = (module, operation) => {
    const allowedRoles = ["BUSINESS_GROUP", "SUPER_ADMIN", "COMPANY"];
    if (module === "*" || allowedRoles.includes(role)) return true;
    const modulePermissions = permissionsByBasePath[module];
    if (modulePermissions) {
      return modulePermissions[operation] === false ? false : true;
    }
    return false;
  };

  return (
    <PermissionContext.Provider value={{ can, setUserPermission, userDetails, userPermission }}>
      {children}
    </PermissionContext.Provider>
  );
}
