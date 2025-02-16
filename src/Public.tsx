import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import ModalInfo from "./shared/modal/ModalInfo";

const Public = () => {
  const modalShow = useSelector((state: RootState) => state.modal.show);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Outlet />
      {modalShow && <ModalInfo />}
    </div>
  );
};

export default Public;
