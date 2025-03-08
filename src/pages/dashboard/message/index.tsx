import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useMessage } from "../../../context/message";
import Sidebar from "./_component/sidebar";
import MainChatArea from "./_component/mainChatArea";

const Message: React.FC = () => {
  const [searchParams] = useSearchParams();
  const conversationId = searchParams.get("conversation");
  // const productId = searchParams.get("product");
  // const userId = searchParams.get("user");
  const {
    currentTab,
    conversations,
    getConversations,
    setCurrentConversation,
  } = useMessage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    getConversations("Support");

    return () => {
      setCurrentConversation(null);
    };
  }, [currentTab]);

  useEffect(() => {
    if (conversationId) {
      const currentConversation = conversations.find(
        (conversation) => conversation._id.toString() === conversationId
      );
      if (currentConversation) {
        setCurrentConversation(currentConversation);
      }
    }
  }, [conversationId, conversations]);

  return (
    <div className="relative flex gap-4 h-screen bg-light-ev4 dark:bg-dark-ev4 max-h-[calc(100vh-75px)] md:max-h-[calc(100vh-160px)]">
      <div
        className={`absolute md:relative flex w-full h-full  md:w-2/5 transition-transform z-20 duration-300 ease-in-out transform ${
          isSidebarOpen ? `translate-x-0` : `-translate-x-full md:translate-x-0`
        }`}
      >
        <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
      </div>
      <MainChatArea setIsSidebarOpen={setIsSidebarOpen} />
    </div>
  );
};

export default Message;
