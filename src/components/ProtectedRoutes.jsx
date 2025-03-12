import { Navigate } from "react-router-dom";
import Loader from "./Loader";
import { usePermissions } from "@/context/PermissionContext";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ module, operation, Component }) => {
  const { can, userPermission } = usePermissions();
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    if (userPermission && userPermission.length > 0) {
      setHasPermission(() => can(module, operation));
    }
  }, [userPermission, module, operation, can]);

  if (hasPermission === null) {
    return <Loader />;
  }

  if (!hasPermission) {
    console.log(`Access Denied: Module - ${module}, Operation - ${operation}`);
    return <Navigate to="/dashboard" replace />;
  }

  return Component;
};

export default ProtectedRoute;
