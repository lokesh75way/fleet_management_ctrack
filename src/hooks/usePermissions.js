import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const allowedRoles = ["BUSINESS_GROUP", "SUPER_ADMIN", "COMPANY"];
const restrictedModules = {
  BUSINESS_GROUP: ["business"],
  COMPANY: ["business", "company"],
};

const usePermissions = () => {
  const permissions = useSelector((state) => state.auth.permissions);
  const role = useSelector((state) => state.auth.role);

  const { data: permissionsByBasePath } = useQuery({
    queryKey: [permissions?.length],
    queryFn: () => {
      let base = {};
      permissions?.forEach((module) => {
        base[module.moduleId.basePath] = module;
      });
      return base;
    },
    enabled: permissions?.length > 0,
    staleTime: Infinity,
  });

  const can = (module, operation) => {
    if (module === "*") return true;
    if (role === "SUPER_ADMIN") return true;
    if (
      allowedRoles.includes(role) &&
      !restrictedModules[role].includes(module)
    )
      return true;
    const modulePermissions = permissionsByBasePath?.[module];
    if (modulePermissions) {
      return modulePermissions[operation] === false ? false : true;
    }
    return false;
  };

  return { can, role, permissions };
};

export default usePermissions;
