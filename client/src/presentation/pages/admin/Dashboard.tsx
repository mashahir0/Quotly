import AdminNavbar from "../../components/admin/AdminNavbar";
import UserTable from "../../components/admin/UserTable";

function Dashboard() {
  return (
    <div className="flex h-screen">
      <AdminNavbar />
      <div className="flex-1 p-6 bg-gray-900 text-white">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <UserTable />
      </div>
    </div>
  );
}

export default Dashboard;

