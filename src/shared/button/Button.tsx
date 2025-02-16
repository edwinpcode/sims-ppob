import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, FC } from "react";
import { Link } from "react-router-dom";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  selected?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  className,
  href,
  type,
  selected,
  ...args
}) => {
  if (href)
    return (
      <Link to={href}>
        <div
          className={`relative cursor-pointer py-2 px-3 rounded-md text-xs flex justify-center ${
            selected && "text-red-500"
          } ${className}`}
        >
          {children}
        </div>
      </Link>
    );

  return (
    <button
      type={type || "button"}
      className={`relative cursor-pointer py-2 px-3 rounded-md text-xs hover:bg-red-500 hover:text-white ${className}`}
      {...args}
    >
      {children}
    </button>
  );
};

export default Button;
