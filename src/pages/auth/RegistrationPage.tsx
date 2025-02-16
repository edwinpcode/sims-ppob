import ButtonPrimary from "src/shared/button/ButtonPrimary";
import { useState } from "react";
import Input from "src/shared/Input/Input";
import imgLogin from "src/assets/Illustrasi Login.png";
import Title from "src/shared/Title";
import {
  AtSymbolIcon,
  CheckIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import ToastError from "src/shared/toast/ToastError";
import { useForm } from "react-hook-form";
import { Registration } from "src/model/membership/Registration";
import { postRegistration } from "src/service/ModuleMembership";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "src/store/loadingSlice";
import ModalConfirm from "src/shared/modal/ModalConfirm";
import Modal from "src/shared/modal/Modal";
import Button from "src/shared/button/Button";

interface FormData extends Registration {
  passwordConfirm: string;
}

const RegistrationPage = () => {
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [showModalInfo, setShowModalInfo] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // const navigate = useNavigate();

  // const loading = useSelector((state: RootState) => state.loading.isLoading);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    setShowModal(false);
    dispatch(setLoading(true));
    postRegistration(data)
      .then((res) => {
        if (res.data.status == 0) {
          setShowModalInfo(true);
          setMessage(res.data.message);
          reset();
        }
      })
      .catch((error) => {
        if (error.response) {
          const res = error.response;
          setMessage(res.data.message);
          setShowMessage(true);
        }
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  return (
    <div className="">
      {showModal && (
        <ModalConfirm
          message=""
          price="Daftar"
          info="Apakah Anda Yakin?"
          onClick={() => setShowModal(false)}
        >
          <div className="flex justify-center">
            <Button
              className="text-red-500 font-semibold"
              type="button"
              onClick={handleSubmit(onSubmit)}
            >
              Ya, Teruskan
            </Button>
          </div>
        </ModalConfirm>
      )}
      {showModalInfo && (
        <Modal
          price="Berhasil"
          info="Apakah Anda Yakin?"
          onClick={() => setShowModal(false)}
        >
          <div className="flex justify-center">
            <CheckIcon className="h-8 rounded-full p-2 text-white bg-green-500" />
          </div>
          <div className="text-center text-lg font-semibold">Berhasil!</div>
          <div className="text-center text-xs">{message}</div>
          <div className="flex justify-center">
            <Button
              className="text-red-500 font-semibold"
              type="button"
              // onClick={handleSubmit(onSubmit)}
              href="/login"
            >
              Kembali
            </Button>
          </div>
        </Modal>
      )}

      <div className="md:flex justify-center">
        <div className="self-center grid xl:gap-4 p-4 md:p-6 md:px-16 relative ">
          <div className="flex justify-center">
            <Title></Title>
          </div>
          <div className="font-semibold text-center text-2xl flex justify-center">
            <div className="max-w-64">Lengkapi data untuk membuat akun</div>
          </div>
          <form
            className="grid gap-2 md:gap-4 mt-8 text-xs"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <Input
                placeholder="masukkan email anda"
                icon={<AtSymbolIcon className="h-4" />}
                type="email"
                {...register("email", { required: "Email required" })}
                error={errors.email}
              />
            </div>
            <div>
              <Input
                placeholder="masukkan nama depan"
                icon={<UserIcon className="h-4" />}
                type="text"
                {...register("first_name", { required: "First name required" })}
                error={errors.first_name}
              />
            </div>
            <div>
              <Input
                placeholder="masukkan nama belakang"
                icon={<UserIcon className="h-4" />}
                type="text"
                {...register("last_name", { required: "last name required" })}
                error={errors.last_name}
              />
            </div>
            <div>
              <Input
                placeholder="masukkan password anda"
                type="password"
                icon={<LockClosedIcon className="h-4" />}
                {...register("password", { required: "Password required" })}
                error={errors.password}
              />
            </div>
            <div>
              <Input
                placeholder="konfirmasi password"
                type="password"
                icon={<LockClosedIcon className="h-4" />}
                {...register("passwordConfirm", {
                  required: "Password required",
                  validate: (val) =>
                    val == watch("password") || "password tidak sama",
                })}
                error={errors.passwordConfirm}
              />
            </div>
            <div className="mt-4">
              <ButtonPrimary
                className="w-full"
                onClick={() => setShowModal(true)}
                type="submit"
              >
                Registrasi
              </ButtonPrimary>
              <div className="md:flex justify-center gap-1 mt-4 text-xs text-gray-500">
                <div className="text-center">belum punya akun? registrasi</div>
                <div className="flex justify-center">
                  <Link className="text-red-500" to="/login">
                    di sini
                  </Link>
                </div>
              </div>
            </div>
          </form>
          {showMessage && (
            <ToastError
              message={message}
              className=""
              onClick={() => setShowMessage(false)}
            />
          )}
        </div>
        <div className="h-screen hidden md:block">
          <img
            src={imgLogin}
            alt="login Image"
            className="h-screen object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
