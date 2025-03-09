import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import {
  ForwardData,
  IConversation,
  IMessage,
  MessageData,
  MessageStart,
  MessageStartResponse,
  ReplyData,
} from "../types/message";
import {
  createMessageService,
  forwardMessageService,
  getConversationsService,
  getMessagesService,
  replyToMessageService,
  sendMessageService,
} from "../services/message";
import socket from "../socket";
import { markMessagesAsRead } from "../utils/socket";
import { useUser } from "./user";

interface Props {
  children?: ReactNode;
}

interface MessageContextType {
  loading: boolean;
  loadingMessage: boolean;
  isTypingList: { value: boolean; id: string }[];
  error: string;
  messages: IMessage[];
  conversations: IConversation[];
  currentConversation: IConversation | null;
  currentTab: string;
  isAnimating: boolean;
  setIsAnimating: (conversation: boolean) => void;
  handleTabChange: (conversation: string) => void;
  setCurrentConversation: (conversation: IConversation | null) => void;
  createMessage: (message: MessageStart) => Promise<MessageStartResponse>;
  sendMessage: (message: MessageData) => Promise<void>;
  getMessages: (receiver: string) => Promise<void>;
  forwardMessage: (message: ForwardData) => Promise<void>;
  replyToMessage: (message: ReplyData) => Promise<void>;
  getConversations: (type: string) => Promise<void>;
}

export const MessageContext = createContext<MessageContextType | undefined>(
  undefined
);

export const MessageProvider: React.FC<Props> = ({ children }) => {
  const { user } = useUser();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMessage, setLoadingMessage] = useState<boolean>(false);
  const [currentConversation, setCurrentConversation] =
    useState<IConversation | null>(null);
  const [currentTab, setCurrentTab] = useState<string>("Support");
  const [isTypingList, setIsTypingList] = useState<
    { value: boolean; id: string }[]
  >([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (currentConversation) {
        await getMessages(currentConversation._id);
      } else {
        setMessages([]);
      }
    };
    fetchData();
  }, [currentConversation]);

  useEffect(() => {
    const handleTyping = ({
      conversationId,
      isTyping,
    }: {
      conversationId: string;
      isTyping: boolean;
    }) => {
      clearTimeout(typingTimeout);
      if (isTyping) {
        setIsTypingList((prev) => [
          ...prev,
          { value: isTyping, id: conversationId },
        ]);
        typingTimeout = setTimeout(() => {
          setIsTypingList((prev) =>
            prev.filter((type) => type.id !== conversationId)
          );
        }, 3000);
      } else {
        setIsTypingList((prev) =>
          prev.filter((type) => type.id !== conversationId)
        );
        clearTimeout(typingTimeout);
      }
    };

    let typingTimeout: any;

    socket.on("typing", handleTyping);

    return () => {
      socket.off("typing", handleTyping);
    };
  }, []);

  useEffect(() => {
    const handleMessage = (message: IMessage, type: string) => {
      if (message.conversationId === currentConversation?._id) {
        if (!messages.find((msg) => msg._id === message._id)) {
          setIsAnimating(true);
          setTimeout(() => {
            setIsAnimating(false);
          }, 500);
          setMessages((prevMessages) => [...prevMessages, message]);
          markMessagesAsRead(currentConversation._id, user!._id);
        }
      } else {
        reloadConversation(type);
      }
    };

    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, [currentConversation, messages, user]);

  useEffect(() => {
    socket.on("messagesRead", () => {
      reloadConversation(currentConversation?.type || currentTab);
    });

    return () => {
      socket.off("messagesRead");
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleError = (error: any) => {
    setLoading(false);
    if (error === "Token expired" || error === "Invalid token") {
      setError("");
    } else {
      setError(error || "An error occurred.");
    }
  };

  const createMessage = async (message: MessageStart) => {
    try {
      const res = await createMessageService(message);
      return res;
    } catch (error) {
      handleError(error);
      throw error;
    }
  };
  const sendMessage = async (message: MessageData) => {
    try {
      const res = await sendMessageService(message);
      setMessages((prevMessages) => [...prevMessages, res]);
      reloadConversation(currentConversation?.type || currentTab);
    } catch (error) {
      handleError(error);
      throw error;
    }
  };

  const getMessages = async (receiver: string) => {
    try {
      setLoadingMessage(true);
      const receivedMessages = await getMessagesService(receiver);
      setMessages(receivedMessages);
      setLoadingMessage(false);
    } catch (error) {
      setLoadingMessage(false);
      handleError(error);
    }
  };

  const forwardMessage = async (message: ForwardData) => {
    try {
      const res = await forwardMessageService(message);
      setMessages((prevMessages) => [...prevMessages, res]);
    } catch (error) {
      handleError(error);
    }
  };

  const replyToMessage = async (message: ReplyData) => {
    try {
      const res = await replyToMessageService(message);
      setMessages((prevMessages) => [...prevMessages, res]);
    } catch (error) {
      handleError(error);
    }
  };

  const getConversations = async (type: string) => {
    try {
      setLoading(true);
      const res = await getConversationsService(type);
      setConversations(res);
      setLoading(false);
    } catch (error) {
      handleError(error);
    }
  };

  const reloadConversation = async (tab: string) => {
    console.log("currentRab", currentTab);
    const res = await getConversationsService(tab);
    setConversations(res);
  };

  const handleTabChange = (type: string) => {
    setCurrentTab(type);
  };

  return (
    <MessageContext.Provider
      value={{
        messages,
        conversations,
        error,
        loading,
        currentConversation,
        isTypingList,
        currentTab,
        loadingMessage,
        isAnimating,
        setIsAnimating,
        handleTabChange,
        setCurrentConversation,
        sendMessage,
        getMessages,
        forwardMessage,
        replyToMessage,
        getConversations,
        createMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessage must be used within a CartProvider");
  }
  return context;
};

export default MessageProvider;
