import React, { useState } from "react";
import moment from "moment";
import { FaShieldAlt } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { CgChevronLeft } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";
import { useUser } from "../../../../context/user";
import { useMessage } from "../../../../context/message";
import socket from "../../../../socket";
import { baseURL, imageUrl } from "../../../../services/api";
import { getDayLabel } from "../../../../utils/chat";
import { SkeletonMessageLoading } from "../../../_components/support/skeletonLoading";

interface Props {
  setIsSidebarOpen: (value: boolean) => void;
}
const MainChatArea: React.FC<Props> = ({ setIsSidebarOpen }) => {
  const { user } = useUser();
  const {
    loadingMessage,
    messages,
    isTypingList,
    currentConversation,
    setCurrentConversation,
    isAnimating,
    sendMessage,
  } = useMessage();
  const [messageInput, setMessageInput] = useState<string>("");
  const [sending, setSending] = useState({
    value: false,
    image: "",
    message: "",
    failed: false,
  });
  const [image, setImage] = useState<string>("");

  // Function to emit startTyping event
  const startTyping = () => {
    socket.emit("typing", {
      conversationId: currentConversation?._id,
      userId: user?._id,
    });
  };

  // Function to emit stopTyping event
  const stopTyping = () => {
    socket.emit("stopTyping", {
      conversationId: currentConversation?._id,
      userId: user?._id,
    });
  };

  const handleMessageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle sending message logic
    if (!currentConversation) return;
    if (!messageInput && !image) return;
    try {
      setSending({ value: true, image, message: messageInput, failed: false });
      setMessageInput("");
      setImage("");
      await sendMessage({
        image: image,
        content: messageInput,
        type: "Chat",
        conversationId: currentConversation._id,
      });
      setSending({ value: false, image: "", message: "", failed: false });
    } catch (error) {
      console.log(error);
      setSending((prev) => ({ ...prev, value: true, failed: true }));
    }
  };

  const handleRetry = () => {
    setMessageInput(sending.message);
    setImage(sending.image);
    setSending((prev) => ({
      ...prev,
      value: false,
      failed: false,
      message: "",
    }));
  };

  return currentConversation ? (
    <div className=" relative flex-1 w-screen overflow-x-hidden flex flex-col bg-primary/5">
      {/* Header */}
      <div className="bg-primary/10 px-4 py-2 flex items-center">
        <CgChevronLeft
          size={30}
          onClick={() => {
            setIsSidebarOpen(true);
            setCurrentConversation(null);
          }}
          className="mr-4 md:hidden"
        />
        <div className="flex items-center ">
          <div className="w-10 h-10 rounded-full bg-gray-300 mr-4"></div>
          <div className="font-semibold">
            {currentConversation.otherUser?.fullName}
          </div>
        </div>
      </div>

      {/* <div className="absolute z-0 flex items-center justify-center top-16 opacity-40 gap-5 px-10 md:px-20">
        <div>
          <FaShieldAlt size={25} />
        </div>
        <div className="text-center text-xs ">
          Kind Reminder: To make sure you're covered by Repeddle Buyer's &
          Seller's Protection, all payments must be made using Repeddle's App
          and Website complete CHECKOUT system.
        </div>
      </div> */}

      {/* Chat Window */}
      {isAnimating && (
        <div className="absolute inset-0 bg-white opacity-20 z-20"></div>
      )}

      <div
        className={`flex-1 z-10 pbs-1 pt-20 px-4 md:px-10 overflow-y-auto flex flex-col-reverse transition-transform duration-500 ${
          isAnimating ? "-translate-y-7" : "translate-y-0"
        }`}
        style={{ scrollBehavior: "smooth" }}
      >
        {isTypingList.find((type) => type.id === currentConversation._id) && (
          <div className="flex justify-start">
            <div className=" flex items-center space-x-2 bg-black opacity-30 p-4 rounded-full  ">
              <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-1500"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-400"></div>
            </div>
          </div>
        )}
        {sending.value && (
          <div>
            <div
              className={`flex  mb-4 justify-end
                      `}
            >
              <div
                className={`p-3 rounded-lg bg-primary text-white self-end
                        `}
              >
                {sending.image && (
                  <img
                    src={imageUrl + sending.image}
                    className="object-contain max-w-full h-auto "
                  />
                )}
                {sending.message}
                <span className="text-white text-opacity-75  text-end w-full text-xs ">
                  {sending.failed ? (
                    <div className="text-red-500">
                      Failed{" "}
                      <span
                        className="underline cursor-pointer"
                        onClick={handleRetry}
                      >
                        Retry
                      </span>
                    </div>
                  ) : (
                    <div className="animate-pulse">Sending</div>
                  )}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Chat content */}
        {loadingMessage ? (
          <>
            <SkeletonMessageLoading />
          </>
        ) : (
          messages
            .slice()
            .reverse()
            .map((message, index, array) => {
              const prevMessage = array[index + 1];
              const showDayLabel =
                !prevMessage ||
                getDayLabel(message.createdAt) !==
                  getDayLabel(prevMessage.createdAt);

              return (
                <div key={message._id}>
                  {showDayLabel && (
                    <div className="text-center my-2 flex justify-center items-center">
                      <div className="bg-black text-white  p-1 rounded-md">
                        {getDayLabel(message.createdAt)}
                      </div>
                    </div>
                  )}
                  <div
                    className={`flex  mb-4 ${
                      message.sender === user?._id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div className="flex mb-1">
                      {message.sender !== user?._id && (
                        <div className="w-8 h-8 rounded-full bg-gray-300 mr-2"></div>
                      )}
                    </div>
                    <div
                      className={`p-1 rounded-lg  max-w-[80%]  ${
                        message.sender === user?._id
                          ? "bg-primary text-white self-end"
                          : "bg-primary/10 self-start"
                      }`}
                    >
                      {message.image && (
                        <img
                          src={imageUrl + message.image}
                          className="object-contain max-w-full h-auto "
                        />
                      )}
                      <div className="break-words">{message.content}</div>
                      <span className="text-opacity-50 w-full text-xs text-end">
                        <div>{moment(message.createdAt).format("LT")}</div>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
        )}
      </div>

      {image && (
        <div className="flex items-center justify-between bg-primary/10 w-full z-20 p-2 px-4">
          <img src={baseURL + image} className="w-10 h-10 object-cover" />

          <IoMdClose
            size={24}
            className="cursor-pointer"
            onClick={() => setImage("")}
          />
        </div>
      )}
      {/* Message Input Box */}
      <form
        onSubmit={handleMessageSubmit}
        className="relative p-4 border-t border-gray-300 flex items-center gap-4 border-opacity-50"
      >
        <input
          type="text"
          value={messageInput}
          onChange={(e) => {
            setMessageInput(e.target.value);
            startTyping();
          }}
          placeholder="Type a message..."
          className="border border-opacity-50 flex-1  rounded-lg p-3 border-gray-300  focus:outline-none focus:border-primary"
          onFocus={startTyping}
          onBlur={stopTyping}
        />
        <button type="submit" className="">
          <IoSend size={30} />
        </button>
      </form>
    </div>
  ) : (
    <div className="flex-1 flex justify-center items-center w-full bg-primary/5 font-bold text-5xl opacity-30">
      Select a conversation to start a chat
    </div>
  );
};

export default MainChatArea;
