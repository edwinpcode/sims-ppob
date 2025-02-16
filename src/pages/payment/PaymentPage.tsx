import MoneyIcon from "@mui/icons-material/Money";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Transaction } from "src/model/transaction/Transaction";
import { postTransaction } from "src/service/ModuleTransaction";
import Button from "src/shared/button/Button";
import Information from "src/shared/Information";
import ModalConfirm from "src/shared/modal/ModalConfirm";
import { setLoading } from "src/store/loadingSlice";
import { setModalData, setModalShow } from "src/store/modalSlice";
import { RootState } from "src/store/store";

const PaymentPage = () => {
  const [show, setShow] = useState(false);

  const paymentMode = useSelector((state: RootState) => state.service);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { handleSubmit } = useForm<Transaction>({
    defaultValues: {
      service_code: paymentMode.service_code,
    },
  });

  const onTopupClick = () => {
    setShow((val) => !val);
  };

  const onSubmit = (data: Transaction) => {
    setShow(false);
    dispatch(setLoading(true));
    postTransaction(data)
      .then((res) => {
        if (res.data.status == 0) {
          dispatch(
            setModalData({
              message: `Pembayaran ${paymentMode.service_name} sebesar`,
              title: `Rp ${paymentMode.service_tariff}`,
              info: "berhasil!",
              type: "success",
            })
          );
          dispatch(setModalShow(true));
        }
      })
      .catch(() => {
        dispatch(
          setModalData({
            message: `Pembayaran ${paymentMode.service_name} sebesar`,
            title: `Rp ${paymentMode.service_tariff}`,
            info: "gagal!",
            type: "failed",
          })
        );
        dispatch(setModalShow(true));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  useEffect(() => {
    if (paymentMode.service_code == "") {
      navigate("/");
    }
  }, [paymentMode]);

  return (
    <div className="container mx-auto pt-12">
      {show && (
        <ModalConfirm
          message={`Lakukan pembayaran ${paymentMode.service_name}`}
          onClick={onTopupClick}
          price={`Rp ${paymentMode.service_tariff} ?`}
        >
          <Button
            className="text-red-500 font-semibold"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            Ya, Lanjutkan Top Up
          </Button>
          <Button onClick={onTopupClick} className="text-gray-500 mt-2">
            Batalkan
          </Button>
        </ModalConfirm>
      )}
      <span className="add_shopping_cart"></span>
      <Information />
      <div className="mt-4">
        <div className="text-xs">Pembayaran</div>
        <div className="flex gap-2 items-center">
          <img src={paymentMode.service_icon} className="h-8" />
          <div className="font-semibold">{paymentMode.service_name}</div>
        </div>
        <form
          className="mt-4 flex flex-col md:flex-row justify-between gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grow">
            <div className="flex gap-4 border py-2 px-3 rounded-md border-gray-400">
              <MoneyIcon className="h-4 text-gray-400" />
              <div>{paymentMode.service_tariff}</div>
            </div>
            <Button
              onClick={onTopupClick}
              className="bg-gray-400 text-white mt-4 w-full hover:bg-red-500"
            >
              Top Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
