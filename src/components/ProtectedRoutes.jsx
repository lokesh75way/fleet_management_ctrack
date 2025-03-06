import { Navigate } from "react-router-dom";
import Loader from "./Loader";
import { usePermissions } from "@/context/PermissionContext";

const ProtectedRoute = ({ module, operation, Component }) => {
  const { can, userDetails } = usePermissions();

  if (!userDetails) {
    console.log("Waiting for user details to load...");
    return <Loader />;
  }

  const hasPermission = can(module, operation);

  if (!hasPermission) {
    console.log(`Access Denied: Module - ${module}, Operation - ${operation}`);
    return <Navigate to="/dashboard" replace />;
  }

  console.log(`Access Granted: Module - ${module}, Operation - ${operation}`);
  return Component;
};

export default ProtectedRoute;
