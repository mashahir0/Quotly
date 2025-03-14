import { Navigate } from "react-router-dom";
import LoginForm from "../../presentation/components/user/Login";
import RegisterForm from "../../presentation/components/user/Register";
import HomePage from "../../presentation/pages/user/HomePage";
import UserAuthenticated from "../redux/protect/UserAuthenticated";
import UserPrivate from "../redux/protect/userPrivate";

const userRoutes = [
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element:(
      <UserAuthenticated><LoginForm /></UserAuthenticated>
      ),
  },
  {
    path: "/register",
    element: (<UserAuthenticated><RegisterForm /></UserAuthenticated>),
  },
  {
    path:'/home',
    element:(<UserPrivate><HomePage/></UserPrivate>)
  }
];

export default userRoutes;
