import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const queryClient = useQueryClient(); 
  const navigate = useNavigate();

  return () => {
    // Clear local storage
    localStorage.removeItem("userDetails");
    localStorage.clear();

    // Clear React Query cache
    queryClient.clear();

    // Redirect to login page
    navigate("/login");
  };
}
