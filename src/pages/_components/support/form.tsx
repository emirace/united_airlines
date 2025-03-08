import React, { useState } from "react";
import { IUser, IGuestUser } from "../../../types/user";
import Button from "./button";

interface FormProps {
  setScreen: (screen: string) => void;
  setUser: (value: IUser) => void;
  loginGuest: (value: IGuestUser) => void;
}

const Form: React.FC<FormProps> = ({ setScreen, loginGuest }) => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState({
    fullName: "",
    email: "",
    error: "",
  });

  const handdleContinue = async () => {
    try {
      setLoading(true);
      setFormError({ ...formError, error: "" });

      if (fullName === "") {
        setFormError({ ...formError, fullName: "Please enter your full name" });
        setLoading(false);
        return;
      }
      if (email === "") {
        setFormError({ ...formError, email: "Please enter your email" });
        setLoading(false);
        return;
      }
      if (fullName !== "" && email !== "") {
        await loginGuest({ email, fullName });
        setScreen("chat");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setFormError({ ...formError, error: error as string });
    }
  };
  return (
    <div className="flex flex-col shadow-lg justify-center items-center h-full overflow-y-auto text-black ">
      <div className="w-3/4 mt-8">
        <div className="mb-4">
          <input
            name="fullName"
            type="text"
            className="block w-full border p-2 rounded-md focus:border-primary focus:outline-none "
            placeholder="Enter your full name"
            onChange={(e) => setFullName(e.target.value)}
          />
          {formError.fullName && (
            <div className="text-red-500">{formError.fullName}</div>
          )}
        </div>
        <div className="mb-4">
          <input
            name="email"
            type="email"
            className="block w-full border p-2 rounded-md focus:border-primary focus:outline-none "
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {formError.email && (
            <div className="text-red-500">{formError.email}</div>
          )}
        </div>
        <Button
          text="Continue"
          disabled={!email || !fullName}
          isLoading={loading}
          onClick={handdleContinue}
        />
        {formError.error && (
          <div className="text-red-500">{formError.error}</div>
        )}
      </div>
    </div>
  );
};

export default Form;
