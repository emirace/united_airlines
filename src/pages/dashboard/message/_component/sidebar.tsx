import { useState } from "react";
import moment from "moment";
import { useMessage } from "../../../../context/message";
import { markMessagesAsRead } from "../../../../utils/socket";
import { SkeletonConversationLoading } from "../../../_components/support/skeletonLoading";
import { useUser } from "../../../../context/user";

interface Props {
  setIsSidebarOpen: (value: boolean) => void;
}

const Sidebar: React.FC<Props> = ({ setIsSidebarOpen }) => {
  const { user } = useUser();
  const {
    currentTab,
    conversations,
    loading,
    currentConversation,
    setCurrentConversation,
    isTypingList,
  } = useMessage();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const filteredConversations = conversations.filter(
    (conversation) =>
      conversation?.otherUser?.fullName &&
      conversation.otherUser?.fullName
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 bg-white md:bg-primary/5 ">
      <div className="p-4">
        {/* Sidebar content */}
        <h2 className="text-lg font-semibold mb-4">{currentTab}s</h2>
        {/* Search input */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search conversations..."
          className="w-full mb-4 px-3 py-2 border border-opacity-50 border-gray-300 rounded-md focus:outline-none focus:border-primary"
        />
      </div>
      <div className="overflow-y-auto">
        {loading ? (
          <>
            <SkeletonConversationLoading />
            <SkeletonConversationLoading />
          </>
        ) : filteredConversations.length === 0 ? (
          <div className="text-center">No {currentTab}</div>
        ) : (
          filteredConversations.map((conversation, index) => (
            <div
              key={index}
              className={`flex items-center py-2 px-4 cursor-pointer  transition-colors duration-300 ${
                conversation._id === currentConversation?._id
                  ? "bg-light-ev1 dark:bg-dark-ev1"
                  : "hover:bg-light-ev3 dark:hover:bg-dark-ev3"
              } `}
              onClick={() => {
                setCurrentConversation(conversation);
                markMessagesAsRead(conversation._id, user!._id);
                setIsSidebarOpen(false);
              }}
            >
              {/* User image */}
              <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
              {/* User details and last message */}
              <div className="flex-1">
                <div className="font-semibold flex gap-3 items-center">
                  {conversation.otherUser?.fullName}{" "}
                  {conversation.isGuest && (
                    <span className="text-malon-color text-xs uppercase">
                      Guest
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-600 ">
                  {isTypingList.find((type) => type.id === conversation._id) ? (
                    <span className="text-primary">typing...</span>
                  ) : conversation.lastMessage?.content?.length > 18 ? (
                    conversation.lastMessage.content.slice(0, 18) + "..."
                  ) : (
                    conversation.lastMessage?.content
                  )}
                </div>
              </div>
              {/* Last message time and unread messages */}
              <div className="flex flex-col items-end">
                <div className="text-sm text-gray-600">
                  {moment(conversation.lastMessage?.createdAt).calendar()}
                </div>
                {conversation.unreadCount > 0 && (
                  <div className="bg-primary text-white text-xs rounded-full px-2 py-1 mt-1">
                    {conversation.unreadCount}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;
