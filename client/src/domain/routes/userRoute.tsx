import { Navigate } from "react-router-dom";
import LoginForm from "../../presentation/components/user/Login";
import RegisterForm from "../../presentation/components/user/Register";
import HomePage from "../../presentation/pages/user/HomePage";
import UserAuthenticated from "../redux/protect/UserAuthenticated";
import UserPrivate from "../redux/protect/userPrivate";
import MyPostPage from "../../presentation/pages/user/MyPostPage";
import TopProfilesPage from "../../presentation/pages/user/TopProfilesPage";
import ChatPage from "../../presentation/pages/user/ChatPage";


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
  },
  {
    path:'/my-posts',
    element:(<UserPrivate><MyPostPage/></UserPrivate>)
  },
  {
    path:'/top-profiles',
    element:(<UserPrivate><TopProfilesPage/></UserPrivate>)
  },
  {
    path:'/message',
    element:(<UserPrivate><ChatPage/></UserPrivate>)
  },
];

export default userRoutes;
