


import { Edit, Trash, Ban } from "lucide-react";
import { useBlockUserMutation, useDeleteUserMutation, useGetUsersQuery } from "../../../data/api/adminApi";
import { User } from "../../../domain/interface/User";


const UserTable = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  const [block] = useBlockUserMutation()
  const [deleteUser] = useDeleteUserMutation()
    
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading users</p>;
  if (!users || users.length === 0) return <p>No users found</p>; // Added check

  // Placeholder functions (Replace with actual logic)
  const handleEdit = async(id: string) => {
   
  };

  const handleBlock =async (id: string) => {
    console.log("Block user:", id);
    try {
        const result = await block(id).unwrap()
        console.log(result);
        
      } catch (error) {
       console.log(error);
       
      }
  };

  const handleDelete = async(id: string) => {
   try {
    const result = await deleteUser(id).unwrap()
    console.log(result);
    
    
   } catch (error) {
    console.log(error)
   }
  };

  return (
    <div className="w-full bg-gray-800 text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">User Management</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-center">Status</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user : User) => (
            <tr key={user?._id} className="border-b border-gray-600 hover:bg-gray-700">
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className={`p-3 text-center font-bold ${user.userStatus === "Active" ? "text-green-400" : "text-red-400"}`}>
                {user.userStatus}
              </td>
              <td className="p-3 flex justify-center space-x-3">
                <button onClick={() => handleEdit(user._id)} className="text-blue-400 hover:text-blue-500">
                  <Edit className="w-5 h-5" />
                </button>
                <button onClick={() => handleBlock(user._id)} className={`hover:text-yellow-500 ${user.userStatus === "Active" ? "text-yellow-400" : "text-green-400"}`}>
                  <Ban className="w-5 h-5" />
                </button>
                <button onClick={() => handleDelete(user._id)} className="text-red-400 hover:text-red-500">
                  <Trash className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
