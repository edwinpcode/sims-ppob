import React, { useEffect } from "react";
import Layout from "./layout/Layout";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState } from "./store/store";
import ModalInfo from "./shared/modal/ModalInfo";
import { useSelector } from "react-redux";

type Props = {};

const Protected = (props: Props) => {
  const modalShow = useSelector((state: RootState) => state.modal.show);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <Layout>
      <Outlet />
      {modalShow && <ModalInfo />}
    </Layout>
  );
};

export default Protected;
