import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLazyGetUsersChatQuery, useMarkMessagesAsSeenMutation } from "../../../data/api/chatApi";
import { motion, AnimatePresence } from "framer-motion";
import socket from "../../../utils/socket";
import { useSelector } from "react-redux";
import { RootState } from "../../../domain/redux/store";

type User = {
  _id: string;
  name: string;
  photo?: string;
  lastMessage?: string;
  lastMessageAt?: string;
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
  const [triggerGetUsers, { data, isLoading, isError }] =useLazyGetUsersChatQuery();
  const [markSeen] = useMarkMessagesAsSeenMutation();
  const messagesender = useSelector((state : RootState)=> state.auth.user?._id)


  const handleSelectUser = (userId: string) => {
    if (!messagesender) {
      console.warn("❌ messagesender is not ready yet.");
      return;
    }
  
    onSelectUser(userId);
    markSeen(userId); // optional backend API
  
    const receiverId = userId;
    const senderId = messagesender;
  
    console.log("📤 Emitting markSeen:", { senderId, receiverId });
    socket.emit("markSeen", { senderId, receiverId });
  };
  
useEffect(() => {
  socket.on("connect", () => {
    console.log("🟢 Connected to socket:", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Disconnected from socket");
  });

  return () => {
    socket.off("connect");
    socket.off("disconnect");
  };
}, []);



  



  // 🔄 Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  // 🔄 Fetch users on debounced search
  useEffect(() => {
    setUsers([]);
    setLastId(null);
    triggerGetUsers({
      search: debouncedSearch,
      page: 1,
      limit: 10,
      lastId: null,
    });
  }, [debouncedSearch]);

  

  // 📌 Process API response
  useEffect(() => {
    if (!data || !Array.isArray(data.users.users)) {
      console.error("❌ Unexpected API response format:", data);
      return;
    }

    const fetchedUsers = data.users.users;

    setUsers((prevUsers) => {
      if (!lastId) {
        return fetchedUsers; // Reset if new search or initial load
      }

      const newUsers = fetchedUsers.filter(
        (user) =>
          !prevUsers.some((existingUser) => existingUser._id === user._id)
      );

      return [...prevUsers, ...newUsers]; // Append new users
    });

    setLastId(data.lastId || null);
    setHasMore(fetchedUsers.length > 0);
  }, [data]);

  // 🔁 Infinite scroll observer
  const lastUserRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (isLoading || !hasMore) return;

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          triggerGetUsers({
            search: debouncedSearch,
            page: 1,
            limit: 10,
            lastId,
          });
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, debouncedSearch, lastId]
  );


  return (
    <div className="w-1/3 bg-gray-900 p-4 rounded-lg h-full flex flex-col">
      {/* 🔍 Search input */}
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
            setLastId(null); // Reset pagination
          }}
        />
      </div>

      {/* 📜 User list */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {isLoading && <p className="text-white">Loading users...</p>}
        {isError && <p className="text-red-500">Error loading users</p>}
        {users.length === 0 && !isLoading && !isError && (
          <p className="text-gray-400 text-center">No users found</p>
        )}

        <ul>
        <AnimatePresence>
  {users.map((user: any, index: number) => {
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
          selectedUserId === user._id ? "bg-blue-600" : "text-white"
        }`}
        onClick={() => handleSelectUser(user._id)}

      >
        <div className="flex items-center">
        {user.photo ? (
                  <img src={user.photo} alt="Profile" className="w-12 h-12 rounded-full object-cover border-2 border-gray-500" />
                ) : (
                  <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-gray-300 text-lg">{user.name[0]}</span>
                  </div>
          )}
          <span>{user.name}</span>
        </div>

        {/* 🔵 Seen indicator */}
        {showDot && (
          <div className="w-2.5 h-2.5 bg-blue-500 rounded-full mr-2" />
        )}
      </motion.li>
    );
  })}
</AnimatePresence>

        </ul>

        {/* Infinite scroll loading indicator */}
        {hasMore && !isLoading && (
          <p className="text-gray-500 text-center mt-2">Loading more...</p>
        )}
      </div>
    </div>
  );
};

export default UserList;
