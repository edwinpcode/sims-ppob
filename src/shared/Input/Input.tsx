import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { FC, InputHTMLAttributes, useEffect, useState } from "react";
import { FieldError } from "react-hook-form";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: any;
  className?: string;
  error?: FieldError;
}

const Input: FC<InputProps> = ({
  label,
  icon,
  className,
  placeholder,
  type,
  error,
  ...args
}) => {
  const [show, setShow] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const onButtonClick = () => {
    setShow((val) => !val);
  };

  useEffect(() => {
    if (type == "password") {
      setShowButton(true);
    } else {
      setShow(true);
    }
  }, [type]);

  return (
    <div>
      <div
        className={`group border text-xs px-3 py-2 rounded-sm border-gray-400 flex justify-between gap-4 focus-within:border-red-500 ${className}`}
      >
        <div className="flex items-center text-gray-400 group-focus:text-red-500">
          {icon}
        </div>
        <input
          className="grow outline-none"
          placeholder={placeholder || "Input"}
          {...args}
          type={show ? "text" : "password"}
        />
        {showButton && (
          <button
            onClick={onButtonClick}
            className="text-gray-400 w-4"
            type="button"
          >
            {show ? <EyeIcon /> : <EyeSlashIcon />}
          </button>
        )}
      </div>
      {error && (
        <div className="text-red-500 mt-1 text-right">{error.message}</div>
      )}
    </div>
  );
};

export default Input;
