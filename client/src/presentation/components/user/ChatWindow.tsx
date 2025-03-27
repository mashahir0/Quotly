
import { useEffect, useState } from "react";
import socket from "../../../utils/socket";
import { useGetMessagesQuery, useSendMessageMutation } from "../../../data/api/chatApi";
import { useGetDetailsQuery } from "../../../data/api/userApi";

interface ChatWindowProps {
  receiverId: string | null;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ receiverId }) => {
  const { data: messages } = useGetMessagesQuery(receiverId || "", { skip: !receiverId });
  const { data: user } = useGetDetailsQuery();
  const [sendMessage] = useSendMessageMutation();

  const [text, setText] = useState("");
  const [chatMessages, setChatMessages] = useState<any[]>(messages || []);
    console.log(messages)
  // ✅ Sync state when API fetches messages
  useEffect(() => {
    if (messages) setChatMessages(messages);
  }, [messages]);

  // ✅ Register user on socket connection
  useEffect(() => {
    if (user?.userData?._id) {
      console.log(`🔄 Registering user ${user.userData._id} in socket room`);
      socket.emit("register", user.userData._id);
    }
  }, [user]);

  // ✅ Prevent duplicate event listeners
  useEffect(() => {
    if (!receiverId) return;

    console.log("🔄 Listening for new messages...");

    const handleNewMessage = (message: any) => {
      console.log("📥 New message received:", message);

      // ✅ Prevent duplicate messages
      setChatMessages((prev) => {
        const isDuplicate = prev.some((msg) => msg._id === message._id);
        return isDuplicate ? prev : [...prev, message];
      });
    };

    socket.off("newMessage"); // ✅ Remove previous listeners
    socket.on("newMessage", handleNewMessage);

    return () => {
      console.log("🛑 Removing listener for newMessage");
      socket.off("newMessage", handleNewMessage);
    };
  }, [receiverId]);

  // ✅ Send message without adding it immediately to state
  const handleSend = async () => {
    if (!text.trim() || !receiverId) return;

    const userId = user?.userData?._id;
    if (!userId) {
      console.error("❌ senderId is missing! Cannot send message.");
      return;
    }

    const newMessage = {
      _id: Date.now().toString(), // Temporary ID
      senderId: userId,
      receiverId,
      message: text,
    };

    // ✅ Emit via WebSocket
    socket.emit("sendMessage", newMessage);

    try {
      await sendMessage({ receiverId, message: text });
    } catch (error) {
      console.error("❌ Failed to send message:", error);
    }

    setText(""); // ✅ Clear input field after sending
  };

  return (
    <div className="w-2/3 bg-gray-900 p-4 rounded-lg h-full flex flex-col">
      <div className="flex-1 overflow-y-auto">
  {chatMessages.map((msg: any, index: number) => (
    <div key={index} className={`p-2 my-2 ${msg.senderId?._id === user?.userData?._id ? "text-right" : "text-left"}`}>
      <p className="bg-gray-700 inline-block p-2 rounded-lg text-white">{msg.message}</p>
    </div>
  ))}
</div>

      {receiverId && (
        <div className="flex mt-3">
          <input
            type="text"
            className="flex-1 p-2 rounded-md bg-gray-800 text-white"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={handleSend} className="ml-2 bg-blue-600 text-white p-2 rounded-md">
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;

