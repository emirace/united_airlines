import { ButtonHTMLAttributes } from "react";
import Loading from "../loading";

type Props = {
  text: string;
  onClick?: () => void;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
};

const Button = ({
  text,
  onClick,
  type = "button",
  className,
  disabled,
  isLoading,
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`cursor-pointer disabled:opacity-80 font-medium text-white capitalize text-[13px] px-[25px] py-2
      rounded-[5px] bg-primary border-none hover:bg-primary/80 ${className}`}
    >
      {isLoading && <Loading size="sm" />}
      {!isLoading && text}
    </button>
  );
};

export default Button;
