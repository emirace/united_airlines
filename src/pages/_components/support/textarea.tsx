import React, { useEffect, useRef } from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea: React.FC<TextareaProps> = ({
  value,
  onChange,
  className = "",
  placeholder = "",
  ...props
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;

    const adjustTextareaHeight = () => {
      if (textarea) {
        textarea.style.height = "auto"; // Reset the height
        textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to the scroll height
      }
    };

    // Adjust height on input
    const handleInput = () => adjustTextareaHeight();

    // Initial adjustment
    adjustTextareaHeight();

    if (textarea) {
      textarea.addEventListener("input", handleInput);
    }
    return () => {
      if (textarea) {
        textarea.removeEventListener("input", handleInput);
      }
    };
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      className={`w-full p-2 border-none overflow-hidden resize-none focus:outline-none ${className}`}
      placeholder={placeholder}
      {...props}
      rows={1}
    />
  );
};

export default Textarea;
