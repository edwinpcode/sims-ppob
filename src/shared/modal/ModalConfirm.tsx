import Modal from "./Modal";
import { AccountBalanceWallet } from "@mui/icons-material";

type Props = {
  message?: string;
  price?: string;
  info?: string;
  onClick?: () => void;
  children: any;
};

const ModalConfirm = ({ message, price, info, onClick, children }: Props) => {
  return (
    <div>
      <Modal onClick={onClick}>
        <div className="flex justify-center">
          <div className="text-white">
            <AccountBalanceWallet
              className="rounded-full bg-red-500 p-2"
              fontSize="large"
              color="inherit"
            />
          </div>
        </div>
        <div className="text-center text-xs mt-4">{message}</div>
        <div className="text-center text-lg font-semibold">{price}</div>
        <div className="text-center text-xs">{info}</div>
        {children}
      </Modal>
    </div>
  );
};

export default ModalConfirm;
