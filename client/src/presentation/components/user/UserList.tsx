

import React, { useState, useEffect, useMemo } from "react";
import {
  useGetUsersChatQuery,
  useMarkMessagesAsSeenMutation,
} from "../../../data/api/chatApi";
import { motion, AnimatePresence } from "framer-motion";
import socket from "../../../utils/socket";
import { useSelector } from "react-redux";
import { RootState } from "../../../domain/redux/store";

type User = {
  _id: string;
  name: string;
  photo?: string;
  seen?: boolean;
  isSender?: boolean;
};

interface UserListProps {
  onSelectUser: (id: string) => void;
  selectedUserId: string | null;
}



const UserList: React.FC<UserListProps> = ({
  onSelectUser,
  selectedUserId,
}) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 25;

  const { data, isLoading, isError, refetch } = useGetUsersChatQuery(
    { search: debouncedSearch, page, limit },
    { refetchOnFocus: true }
  );

  console.log(data?.users); // This will help you inspect the data structure in the console.
  const [markSeen] = useMarkMessagesAsSeenMutation();
  const messagesender = useSelector(
    (state: RootState) => state.auth.user?._id
  );

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1); // Reset to first page on search
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  // Socket listener
  useEffect(() => {
    const handleUserUpdate = () => {
      refetch();
    };
    socket.on("userListUpdate", handleUserUpdate);
  
    return () => {
      socket.off("userListUpdate", handleUserUpdate);
    };
  }, [refetch]);
  

  const handleSelectUser = (userId: string) => {
    if (!messagesender) return;
    onSelectUser(userId);
    markSeen(userId);
    socket.emit("markSeen", {
      senderId: messagesender,
      receiverId: userId,
    });
  };

  const totalPages = useMemo(() => {
    return Math.ceil((data?.total || 0) / limit);
  }, [data, limit]);
  

  return (
    <div className="w-1/3 bg-gray-900 p-4 rounded-lg h-full flex flex-col">
      <div className="mb-3">
        <label htmlFor="user-search" className="block text-2xl text-white mb-1">
          🔍 Search Users
        </label>
        <input
          id="user-search"
          type="text"
          placeholder="Search by name..."
          className="w-full p-2 bg-gray-800 text-white rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {isLoading && <p className="text-white">Loading users...</p>}
        {isError && <p className="text-red-500">Error loading users</p>}
        {!isLoading && data?.users?.length === 0 && (
          <p className="text-gray-400 text-center">No users found</p>
        )}

        <ul>
          <AnimatePresence>
          {(data?.users || []).map((user: User) => {
              const showDot = user.seen === false && user.isSender === false;
              return (
                <motion.li
                  key={user._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-gray-700 ${
                    selectedUserId === user._id
                      ? "bg-blue-600 text-white"
                      : "text-white"
                  }`}
                  onClick={() => handleSelectUser(user._id)}
                >
                  <div className="flex items-center gap-2">
                    {user.photo ? (
                      <img
                        src={user.photo}
                        alt="Profile"
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-500"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                        <span className="text-gray-300 text-lg">
                          {user.name[0]}
                        </span>
                      </div>
                    )}
                    <span>{user.name}</span>
                  </div>

                  {showDot && (
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full mr-2" />
                  )}
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </div>

      {/* Pagination Controls */}
      <div className="mt-2 flex justify-center gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-1 bg-gray-800 text-white rounded disabled:opacity-40"
        >
          Prev
        </button>
       
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-1 bg-gray-800 text-white rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
