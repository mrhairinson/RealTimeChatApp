import React from "react";
import { useChat } from "../store/useChat";
import { NoChatSelected } from "../components/NoChatSelected";
import { Sidebar } from "../components/Sidebar";
import { ChatContainer } from "../components/ChatContainer";

export const HomePage: React.FC = () => {
  const { selectedUser } = useChat();
  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer/>}
          </div>
        </div>
      </div>
    </div>
  );
};
