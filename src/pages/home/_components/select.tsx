import { useState, useEffect, useRef } from "react";
import { FiChevronDown } from "react-icons/fi";

interface Option {
  label: string;
  value: string;
}

interface Props {
  options: Option[];
  onChange: (value: string) => void;
  value: string;
  placeholder?: string;
  bg?: string;
}

const Select: React.FC<Props> = ({
  options,
  placeholder = "Select",
  bg,
  onChange,
  value,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(null);
  const [position, setPosition] = useState<"bottom" | "top">("bottom");

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle dropdown state
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    if (value) {
      const currentValue = options.find((option) => option.value === value);
      setSelected(currentValue || null);
    }
  }, [value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Adjust dropdown position based on available space
  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      setPosition(spaceBelow < 200 ? "top" : "bottom");
    }
  }, [isOpen]);

  const handleSelect = (option: Option) => {
    setSelected(option);
    onChange(option.value);
    setIsOpen(false); // Close after selection
  };

  return (
    <div
      className="relative w-full text-black text-opacity-70 "
      ref={dropdownRef}
    >
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown}
        className={`flex justify-between items-center gap-3 px-4 py-2 w-full  ${
          isOpen ? "border border-primary " : "rounded-lg"
        } ${bg || "bg-gray-100"} ${
          position === "top" ? "rounded-b-lg" : "rounded-t-lg"
        }`}
      >
        <span className="whitespace-nowrap font-medium text-lg text-gray-400">
          {selected ? selected.label : placeholder}
        </span>
        <FiChevronDown
          className={`w-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute w-full bg-white  z-10 ${
            position === "top" && isOpen
              ? "bottom-full border-x border-t border-primary rounded-t-lg"
              : "top-full border-x border-b border-primary rounded-b-lg"
          } `}
        >
          {/* Options List */}
          <div className="max-h-60 overflow-y-auto">
            {options.length > 0 ? (
              options.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-3 p-3 hover:bg-primary/20 cursor-pointer"
                  onClick={() => handleSelect(option)}
                >
                  <span className="">{option.label}</span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 p-3">
                No options available
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;
