import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router";
import { BiChevronRight } from "react-icons/bi";
import { FaPaperPlane } from "react-icons/fa";
import { IUser } from "../../../types/user";

interface FAQProps {
  articles: { _id: string; topic: string }[];
  setScreen: (screen: string) => void;
  setShowSupport: (screen: boolean) => void;
  user: IUser | null;
}

const FAQ: React.FC<FAQProps> = ({
  articles,
  setScreen,
  setShowSupport,
  user,
}) => {
  const navigate = useNavigate();
  const handleContinue = () => {
    if (user) {
      setScreen("chat");
    } else {
      setScreen("form");
    }
  };
  return (
    <div className="absolute top-0 bottom-0 right-0 left-0 shadow-lg overflow-y-auto z-10 text-black">
      <div className="p-4">
        <div className="h-32 " />
        <div className="border-t border-orange-color shadow-lg p-4 h-40 mb-5 bg-white rounded-md">
          <div className="font-semibold mb-4">FAQ</div>
          <div className="flex items-center border border-black p-2 py-1 rounded-full">
            <FiSearch className="text-lg" />
            <input
              className="flex-1 px-2 focus:bottom-0 focus:outline-none"
              placeholder="Search question"
            />
          </div>
          <div>
            {articles.map((article) => (
              <div
                key={article._id}
                onClick={() => {
                  setShowSupport(false);
                  navigate(`/articles/${article._id}`);
                }}
                className="flex items-center justify-between p-3 hover:text-orange-color cursor-pointer"
              >
                <div>{article.topic}</div>
                <BiChevronRight size={20} />
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 border-t border-orange-color shadow-lg bg-white rounded-md">
          <div className="font-semibold mb-4">Start a conversation</div>
          <div className="flex gap-5 items-center ">
            <img src="" className="w-16 h-16 bg-black rounded-full" />
            <div>We will reply as soon as we can, but usually within 2hrs</div>
          </div>
          <div
            onClick={handleContinue}
            className="border mt-4 border-black p-2 rounded-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <FaPaperPlane />
            <div>Send us a message</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
