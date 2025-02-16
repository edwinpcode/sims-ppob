import { FC, HTMLAttributes } from "react";
import { CloseOutlined } from "@mui/icons-material";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  message?: string;
  price?: string;
  info?: string;
  icon?: string;
  image?: string;
  goBack?: boolean;
  onClick?: () => void;
}

const Modal: FC<ModalProps> = ({
  children,
  price,
  message,
  info,
  icon,
  onClick,
  ...args
}) => {
  return (
    <div className="z-40 fixed inset-0">
      <div
        className="bg-black top-0 left-0 fixed h-full w-full opacity-20"
        onClick={onClick}
      ></div>
      <div className="relative h-full flex justify-center items-center">
        <CloseOutlined className="absolute top-8 right-8" onClick={onClick} />
        <div className={`bg-white rounded-md py-8 px-16`} {...args}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
