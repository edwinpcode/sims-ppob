import { CloseOutlined } from "@mui/icons-material";
import { FC, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  message: string;
  onClick: () => void;
}

const ToastError: FC<Props> = ({
  children,
  className,
  message,
  onClick,
  ...args
}) => {
  return (
    <div
      className={`bg-red-200 text-red-500 text-xs flex justify-between items-center p-2 rounded-sm mt-2 ${className}`}
      {...args}
    >
      {children}
      {message}
      <button onClick={onClick}>
        <CloseOutlined className="h-4" sx={{ fontSize: "16px" }} />
      </button>
    </div>
  );
};

export default ToastError;
