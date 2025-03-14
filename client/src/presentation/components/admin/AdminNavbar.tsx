import { LayoutDashboard, Users, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../domain/redux/store";
import { Link, useNavigate } from "react-router-dom";
import { clearAdmin } from "../../../domain/redux/slilce/adminSlice";

const AdminNavbar = () => {
    const {admin} = useSelector((state : RootState) => state.admin)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () =>{
      localStorage.removeItem('adminToken')
      dispatch(clearAdmin())
      navigate('/admin/login')
    }

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col p-5">
      <h1 className="text-xl font-bold text-center mb-6">{admin?.name  || 'admin'}</h1>

      <nav className="space-y-4">
        <Link to="/admin/dashboard" className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-700">
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </Link>
        <Link to="/admin/users" className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-700">
          <Users className="w-5 h-5" />
          <span>Users</span>
        </Link>
      </nav>

      <div className="mt-auto">
        <button className="w-full flex items-center justify-center space-x-3 p-3 rounded-md bg-red-600 hover:bg-red-700" 
        onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminNavbar;
