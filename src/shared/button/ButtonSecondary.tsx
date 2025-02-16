import { ButtonHTMLAttributes, FC } from "react";
import { Link } from "react-router-dom";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  href?: string;
}

const ButtonSecondary: FC<ButtonProps> = ({
  selected = false,
  children,
  className,
  href,
  ...argh
}) => {
  if (href)
    return (
      <Link to={href}>
        <div
          className={`relative hover:bg-red-500 text-red-500 font-semibold px-3 py-2 hover:text-white rounded-md cursor-pointer border text-xs flex justify-center ${className}`}
        >
          {children || "Button"}
        </div>
      </Link>
    );
  return (
    <button
      type="button"
      className={`relative hover:bg-red-500 text-red-500 font-semibold px-3 py-2 hover:text-white rounded-md cursor-pointer border text-xs flex justify-center ${className}`}
      {...argh}
    >
      {children || "Button"}
    </button>
  );
};

export default ButtonSecondary;
