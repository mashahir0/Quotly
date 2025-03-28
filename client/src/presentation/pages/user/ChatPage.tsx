import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/user/Navbar";
import UserList from "../../components/user/UserList";
import ChatWindow from "../../components/user/ChatWindow";
import Footer from "../../components/user/Footer";

const ChatPage: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [showNavbar, setShowNavbar] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  // Hide navbar when the page loads
  useEffect(() => {
    setTimeout(() => {
      setShowNavbar(false);
      chatContainerRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 800);
  }, []);

  // Detect mouse movement to show navbar when hovering near the top
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 50) {
        setShowNavbar(true); // Show navbar when cursor is at the top
      } else {
        setShowNavbar(false); // Hide navbar otherwise
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: showNavbar ? 0 : -100 }}
        transition={{ duration: 0.4 }}
        className="fixed w-full z-50 bg-gray-900 shadow-md"
      >
        <Navbar />
      </motion.div>

      <div ref={chatContainerRef} className="flex w-full h-screen bg-gray-900 transition-all duration-500">
        <UserList onSelectUser={setSelectedUserId} selectedUserId={selectedUserId} />
        <ChatWindow receiverId={selectedUserId} />
      </div>

      <Footer />
    </>
  );
};

export default ChatPage;
