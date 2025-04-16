// import { Navigate } from "react-router-dom";

// const UserAuthenticated = ({ children }: { children: React.ReactNode }) => {
//   const token = localStorage.getItem("userToken");

//   // If token exists, redirect to '/home'
//   if (token) {
//     return <Navigate to="/home" />;
//   }

//   // If token does not exist, return the children (login/register forms)
//   return <>{children}</>;
// };

// export default UserAuthenticated;


import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserAuthenticated = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("userToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token, navigate]);

  if (token) return null; // Prevents unnecessary rendering

  return <>{children}</>;
};

export default UserAuthenticated;
