import React from "react";
import { CgChevronLeft } from "react-icons/cg";
import { IUser } from "../../../types/user";
import IMAGES from "../../../assets/images";

interface HeaderProps {
  screen: string;
  setScreen: (screen: string) => void;
  user: IUser | null;
}

const Header: React.FC<HeaderProps> = ({ screen, setScreen, user }) => (
  <div className="bg-black p-5 ">
    <div className="flex items-center gap-5">
      {screen !== "home" && (
        <CgChevronLeft
          className="text-3xl text-white cursor-pointer"
          onClick={() => setScreen("home")}
        />
      )}
      <img className="w-12" src={IMAGES.logo} alt="logo" />
    </div>
    {screen === "home" ? (
      <div className="text-3xl text-orange-color font-bold my-10 capitalize">
        Hello {user ? user.fullName : "Guest"}
      </div>
    ) : (
      <div className="flex gap-5 items-center mx-5 mb-0 mt-10">
        <div className="flex items-center">
          <img src="" className="w-12 h-12 bg-white rounded-full" />
          <img src="" className="w-12 h-12 bg-white -ml-5 rounded-full" />
          <img src="" className="w-12 h-12 bg-white -ml-5 rounded-full" />
        </div>
        <div className="text-white text-sm">
          We will reply as soon as we can, but usually within 2hrs
        </div>
      </div>
    )}
  </div>
);

export default Header;
