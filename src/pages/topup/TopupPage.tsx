import MoneyIcon from "@mui/icons-material/Money";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Topup } from "src/model/transaction/Topup";
import { postTopup } from "src/service/ModuleTransaction";
import Button from "src/shared/button/Button";
import Information from "src/shared/Information";
import Input from "src/shared/Input/Input";
import ModalConfirm from "src/shared/modal/ModalConfirm";
import { setLoading } from "src/store/loadingSlice";
import { setModalData, setModalShow } from "src/store/modalSlice";

const TopupPage = () => {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<Topup>();

  const data = [
    { value: 10000, label: "Rp 10.000" },
    { value: 20000, label: "Rp 20.000" },
    { value: 50000, label: "Rp 50.000" },
    { value: 100000, label: "Rp 100.000" },
    { value: 250000, label: "Rp 25.000" },
    { value: 500000, label: "Rp 500.000" },
  ];

  const onSelect = (val: number) => {
    setValue("top_up_amount", val);
  };

  const onTopupClick = () => {
    setShow((val) => !val);
  };

  const onSubmit = (data: Topup) => {
    setShow(false);
    setLoading(true);
    postTopup(data)
      .then((res) => {
        if (res.data.status == 0) {
          dispatch(
            setModalData({
              message: res.data.message,
              title: `Rp ${data.top_up_amount}`,
              info: "berhasil!",
              type: "success",
            })
          );
          dispatch(setModalShow(true));
        }
      })
      .catch((error) => {
        dispatch(
          setModalData({
            message: error.message,
            title: `Rp ${data.top_up_amount}`,
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

  return (
    <div className="container mx-auto pt-12">
      {show && (
        <ModalConfirm
          message="Anda yakin untuk Top Up sebesar"
          onClick={onTopupClick}
          price={`Rp ${watch("top_up_amount")} ?`}
        >
          <div className="flex flex-col">
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
          </div>
        </ModalConfirm>
      )}
      <span className="add_shopping_cart"></span>
      <Information />
      <div className="mt-4">
        <div className="text-xs">Silahkan Masukkan</div>
        <div className="font-semibold text-xl">Nominal Top Up</div>
        <form
          className="mt-4 flex flex-col md:flex-row justify-between gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grow">
            <Input
              className="w-full"
              icon={<MoneyIcon className="h-4" />}
              {...register("top_up_amount", {
                validate: (val) => !isNaN(val) || "Number only",
                required: "nominal required",
              })}
              error={errors.top_up_amount}
            />
            <Button
              onClick={onTopupClick}
              className="bg-gray-400 text-white mt-4 w-full hover:bg-red-500"
            >
              Top Up
            </Button>
          </div>
          <div className="">
            <div className="grid grid-cols-3 gap-4">
              {data.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => onSelect(item.value)}
                  className="border cursor-pointer border-gray-200 hover:border-red-500 hover:text-red-500 px-3 py-2 rounded-md"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TopupPage;
