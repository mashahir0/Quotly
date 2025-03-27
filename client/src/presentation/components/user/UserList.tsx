




import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLazyGetUsersChatQuery } from "../../../data/api/chatApi";
import { motion, AnimatePresence } from "framer-motion";

interface UserListProps {
  onSelectUser: (id: string) => void;
  selectedUserId: string | null;
}

const UserList: React.FC<UserListProps> = ({ onSelectUser, selectedUserId }) => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [lastId, setLastId] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const [triggerGetUsers, { data, isLoading, isError }] = useLazyGetUsersChatQuery();
  const [debouncedSearch, setDebouncedSearch] = useState(""); 

  console.log("📌 API Response:", data);

  /** 🔄 Debounce Search Input */
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 300); // ✅ 300ms delay to prevent excessive API calls

    return () => clearTimeout(handler);
  }, [search]);

  /** 🔄 Fetch Users on `debouncedSearch` Change */
  useEffect(() => {
    setUsers([]); // ✅ Clear previous users on new search
    setLastId(null);
    triggerGetUsers({ search: debouncedSearch, page: 1, limit: 10, lastId: null });
  }, [debouncedSearch]);

  /** 📌 Process API Response */
  useEffect(() => {
    if (!data || !data.users || !Array.isArray(data.users.users)) {
      console.error("❌ Unexpected API response format:", data);
      return;
    }
  
    setUsers((prevUsers) => {
      // ✅ Prevent duplicates: If lastId is null (new search), replace users
      if (!lastId) {
        return data.users.users;
      }
  
      // ✅ Avoid adding duplicates by checking existing IDs
      const newUsers = data.users.users.filter(
        (user) => !prevUsers.some((existingUser) => existingUser._id === user._id)
      );
  
      return [...prevUsers, ...newUsers];
    });
  
    setLastId(data.users.lastId || null);
    setHasMore(data.users.users.length > 0);
  }, [data]);
  

  /** 🔄 Infinite Scroll - Load More Users */
  const lastUserRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (isLoading || !hasMore) return;

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log("🔄 Fetching more users...");
          triggerGetUsers({ search: search.trim(), page: 1, limit: 10, lastId });
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, search, lastId]
  );

  return (
    <div className="w-1/3 bg-gray-900 p-4 rounded-lg h-full flex flex-col">
      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search users..."
        className="w-full p-2 mb-3 bg-gray-800 text-white rounded-md"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setLastId(null);
        }}
      />

      {/* 📜 User List */}
      <div className="flex-1 overflow-y-auto">
        {isLoading && <p className="text-white">Loading users...</p>}
        {isError && <p className="text-red-500">Error loading users</p>}
        {users.length === 0 && !isLoading && !isError && (
          <p className="text-gray-400 text-center">No users found</p>
        )}

        <ul>
          <AnimatePresence>
            {users.map((user: any, index: number) => (
              <motion.li
                key={user._id}
                ref={index === users.length - 1 ? lastUserRef : null}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className={`flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-700 ${
                  selectedUserId === user._id ? "bg-blue-600" : "text-white"
                }`}
                onClick={() => onSelectUser(user._id)}
              >
                {/* 🖼️ User Image */}
                <img
                  src={user.photo || "/default-avatar.png"}
                  alt={user.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <span>{user.name}</span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        {/* 🔄 Infinite Scroll Loader */}
        {hasMore && <p className="text-gray-500 text-center mt-2">Loading more...</p>}
      </div>
    </div>
  );
};

export default UserList;
