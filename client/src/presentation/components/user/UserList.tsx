import React from "react";
import { useGetUsersChatQuery } from "../../../data/api/chatApi";

interface UserListProps {
  onSelectUser: (id: string) => void;
  selectedUserId: string | null;
}

const UserList: React.FC<UserListProps> = ({ onSelectUser, selectedUserId }) => {
  const { data: users, isLoading, isError } = useGetUsersChatQuery();

  if (isLoading) return <p className="text-white">Loading users...</p>;
  if (isError) return <p className="text-red-500">Error loading users</p>;

  return (
    <div className="w-1/3 bg-gray-800 p-4 rounded-lg h-full overflow-y-auto">
      <h2 className="text-white text-lg font-bold mb-3">Users</h2>
      <ul>
        {users?.map((user: any) => (
          <li
            key={user._id}
            className={`p-2 rounded-md cursor-pointer hover:bg-gray-700 ${
              selectedUserId === user._id ? "bg-blue-600" : "text-white"
            }`}
            onClick={() => onSelectUser(user._id)}
          >
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
