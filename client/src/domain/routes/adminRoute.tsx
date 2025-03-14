

import AdminLogin from "../../presentation/components/admin/AdminLogin";
import Dashboard from "../../presentation/pages/admin/Dashboard";
import AdminAuthenticated from "../redux/protect/admin/adminAuthenticated";
import AdminPrivate from "../redux/protect/admin/adminPrivate";



const adminRoutes = [
    {
        path : '/admin/login',
        element :(<AdminAuthenticated><AdminLogin/></AdminAuthenticated>    )
    },
    {
        path: '/admin/dashboard',
        element:(<AdminPrivate> <Dashboard/></AdminPrivate> )
    }
]


export default adminRoutes