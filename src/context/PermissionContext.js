import React, { createContext, useContext, useState, useEffect } from 'react';

const PermissionContext = createContext();

export function usePermissions() {
  return useContext(PermissionContext);
}

export function PermissionProvider({ children }) {
  const [permissionsByModuleId, setPermissionsByModuleId] = useState({});
  const [permissionsByBasePath, setPermissionsByBasePath] = useState({});

  // need to access store/storage and set user permissions
  const [userPermission] = useState([])

  // Function to transform permissions array into object format to get quicker access
  const transformPermissions = (userPermission, field) => {
    const permissionsByModuleId = {};
    const permissionsByBasePath = {};
    userPermission.forEach(permission => {
      permissionsByModuleId[permission.moduleId] = permission;
      permissionsByBasePath[permission.endPoint] = permission;
    });
    setPermissionsByModuleId(permissionsByModuleId)
    setPermissionsByBasePath(permissionsByBasePath)
  };

  useEffect(() => {
    transformPermissions(userPermission);
  }, [userPermission]);


  const can = (module, operation) => {
    if (operation === '*') return true;

    const modulePermissions = permissionsByModuleId[module] || permissionsByBasePath[module];
    if (modulePermissions) {
      return modulePermissions[operation] ?? false;
    }
    return false; // Module not found, deny permission
  };

  return (
    <PermissionContext.Provider value={{ can }}>
      {children}
    </PermissionContext.Provider>
  );
}
