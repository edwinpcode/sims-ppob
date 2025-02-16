import Modal from "./Modal";
import Button from "../button/Button";
import { CheckIcon } from "@heroicons/react/24/solid";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store/store";
import { setModalShow } from "src/store/modalSlice";
import { useNavigate } from "react-router-dom";

type Props = {
  // message?: string;
  // price?: string;
  // info?: string;
  // onClick?: () => void;
  // type: "success" | "failed" | "warning" | "info";
};

const ModalInfo = ({}: Props) => {
  const message = useSelector((state: RootState) => state.modal.message);
  const title = useSelector((state: RootState) => state.modal.title);
  const info = useSelector((state: RootState) => state.modal.info);
  const type = useSelector((state: RootState) => state.modal.type);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClose = () => {
    dispatch(setModalShow(false));
  };

  const onClick = () => {
    dispatch(setModalShow(false));
    navigate("/");
  };

  return (
    <Modal onClick={onClose}>
      <div className="flex justify-center">
        {type == "success" && (
          <CheckIcon className="h-8 rounded-full p-2 text-white bg-green-500" />
        )}

        {type == "failed" && (
          <CloseIcon
            className="rounded-full p-2 text-white bg-red-500"
            fontSize="large"
          />
        )}
      </div>
      <div className="mt-4">
        <div className="text-center text-xs">{message}</div>
        <div className="text-center text-lg font-semibold">{title}</div>
        <div className="text-center text-xs">{info}</div>
        <div className="text-center mt-4">
          <Button className="text-red-500 font-semibold" onClick={onClick}>
            Kembali Ke Beranda
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalInfo;
