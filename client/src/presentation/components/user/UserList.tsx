

import React, { useState, useEffect, useRef, useCallback } from "react";
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
  const [users, setUsers] = useState<User[]>([]);
  const [lastId, setLastId] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useGetUsersChatQuery(
    { search: debouncedSearch, page: 1, limit: 25, lastId },
    {
      skip: false,
      refetchOnFocus: true,
    }
  );
  
  console.log(data)

  const [markSeen] = useMarkMessagesAsSeenMutation();
  const messagesender = useSelector(
    (state: RootState) => state.auth.user?._id
  );

  // ✅ Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  // ✅ Handle data update from query
  useEffect(() => {
    if (!data || !Array.isArray(data.users?.users)) return;

    const fetchedUsers = data.users.users;

    setUsers((prev) => {
      if (!lastId) return fetchedUsers;
      const newUsers = fetchedUsers.filter(
        (user) => !prev.some((u) => u._id === user._id)
      );
      return [...prev, ...newUsers];
    });

    setLastId(data.lastId || null);
    setHasMore(fetchedUsers.length > 0);
  }, [data]);

  useEffect(() => {
    const handleUserUpdate = () => {
      console.log("🔁 userListUpdate received – refetching chat list...");
      refetch();
    };
  
    socket.on("userListUpdate", handleUserUpdate);
  
    return () => {
      socket.off("userListUpdate", handleUserUpdate);
    };
  }, [refetch]);
  
  
  

  // ✅ Infinite scroll logic
  const lastUserRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (isLoading || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setLastId(users[users.length - 1]?._id || null);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, users]
  );

  // ✅ Handle select
  const handleSelectUser = (userId: string) => {
    if (!messagesender) return;

    onSelectUser(userId);
    markSeen(userId);

    socket.emit("markSeen", {
      senderId: messagesender,
      receiverId: userId,
    });
  };

  return (
    <div className="w-1/3 bg-gray-900 p-4 rounded-lg h-full flex flex-col">
      <div className="mb-3">
        <label
          htmlFor="user-search"
          className="block text-2xl font-medium text-white mb-1"
        >
          🔍 Search Users
        </label>
        <input
          id="user-search"
          type="text"
          placeholder="Search by name..."
          className="w-full p-2 bg-gray-800 text-white rounded-md"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setUsers([]);
            setLastId(null);
          }}
        />
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {isLoading && users.length === 0 && (
          <p className="text-white">Loading users...</p>
        )}
        {isError && <p className="text-red-500">Error loading users</p>}
        {!isLoading && users.length === 0 && !isError && (
          <p className="text-gray-400 text-center">No users found</p>
        )}

        <ul>
          <AnimatePresence>
            {users.map((user, index) => {
              const showDot = user.seen === false && user.isSender === false;

              return (
                <motion.li
                  key={user._id}
                  ref={index === users.length - 1 ? lastUserRef : null}
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

        {/* {hasMore && !isLoading && (
          <p className="text-gray-500 text-center mt-2">Loading more...</p>
        )} */}
      </div>
    </div>
  );
};

export default UserList;
