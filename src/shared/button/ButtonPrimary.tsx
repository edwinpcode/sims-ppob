import { ButtonHTMLAttributes, FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const ButtonPrimary: FC<ButtonProps> = ({
  children,
  className,
  type,
  onClick,
  ...args
}) => {
  return (
    <button
      onClick={onClick}
      type={type || "button"}
      className={`bg-red-500 px-3 py-2 text-white rounded-sm font-semibold cursor-pointer text-xs ${className}`}
      {...args}
    >
      {children || "Button"}
    </button>
  );
};

export default ButtonPrimary;
