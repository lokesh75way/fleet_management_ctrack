import React, { createContext, useContext, useState, useEffect } from 'react';

const PermissionContext = createContext();

export function usePermissions() {
  return useContext(PermissionContext);
}

export function PermissionProvider({ children }) {
  const [permissions, setPermissions] = useState({});

  // Function to transform permissions array into object format to get quicker access
  const transformPermissions = (permissionsArray) => {
    const transformedPermissions = {};
    permissionsArray.forEach(permission => {
      transformedPermissions[permission.module] = {
        edit: permission.edit,
        add: permission.add,
        read: permission.read,
        delete: permission.delete
      };
    });
    return transformedPermissions;
  };

  useEffect(() => {
    
    const receivedPermissions = [
      { module: 1, edit: true, add: false, read: true, delete: false },
      { module: 2, edit: false, add: true, read: true, delete: true },
      { module: 3, edit: true, add: true, read: true, delete: true }
    ];

    const transformedPermissions = transformPermissions(receivedPermissions);
    setPermissions(transformedPermissions);
  }, []);


  const can = (moduleId, operation) => {
    const modulePermissions = permissions[moduleId];
    if (modulePermissions) {
      return modulePermissions[operation];
    }
    return false; // Module not found, deny permission
  };

  return (
    <PermissionContext.Provider value={{ can }}>
      {children}
    </PermissionContext.Provider>
  );
}
