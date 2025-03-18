import React, { useState } from "react";
import Navbar from "../../components/user/Navbar";
import UserList from "../../components/user/UserList";
import ChatWindow from "../../components/user/ChatWindow";
import Footer from "../../components/user/Footer";

const ChatPage: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  return (
    <>
      <Navbar />
      <div className="flex w-full h-screen bg-gray-900">
        <UserList onSelectUser={setSelectedUserId} selectedUserId={selectedUserId} />
        <ChatWindow receiverId={selectedUserId} />
      </div>
      <Footer />
    </>
  );
};

export default ChatPage;
