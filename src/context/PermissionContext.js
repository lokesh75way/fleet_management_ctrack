import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
const PermissionContext = createContext();
export function usePermissions() {
  return useContext(PermissionContext);
}
export function PermissionProvider({ children }) {
  const [permissionsByModuleId, setPermissionsByModuleId] = useState({});
  const [permissionsByBasePath, setPermissionsByBasePath] = useState({});
  // need to access store/storage and set user permissions
  // const permissions = useSelector(state => state.auth.permission);
  // console.log(permissions)
  const permissions = JSON.parse(localStorage.getItem('permission'))
  const [userPermission, setUserPermission] = useState(permissions[0].permission || [])
  // Function to transform permissions array into object format to get quicker access
  const transformPermissions = (userPermission, field) => {
    const permissionsByModuleId = {};
    const permissionsByBasePath = {};
    userPermission.forEach(permission => {
        // permissionsByModuleId[data?.moduleId?.moduleId] = permission.permission;
        permissionsByBasePath[permission?.moduleId?.basePath] = permission;
        return ;
    });
    console.log(permissionsByBasePath)
    setPermissionsByModuleId(permissionsByModuleId)
    setPermissionsByBasePath(permissionsByBasePath)
  };
  useEffect(() => {
    transformPermissions(userPermission);
  }, [userPermission]);
  const can = (module, operation) => {
    if (module === '*') return true;
    const modulePermissions = permissionsByBasePath[module];
    if (modulePermissions) {
      return modulePermissions[operation] === false ? false :  true
    }
    return false; 
  };
  return (
    <PermissionContext.Provider value={{ can, setUserPermission }}>
      {children}
    </PermissionContext.Provider>
  );
}