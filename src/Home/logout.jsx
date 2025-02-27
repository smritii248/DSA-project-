import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    // Clear any stored tokens or user data
    localStorage.removeItem("googleAuthToken"); // Example: Clear Google auth token
    // Redirect to login page
    navigate("/login");
  };

  return logout;
};
