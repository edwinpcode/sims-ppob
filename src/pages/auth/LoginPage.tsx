import ButtonPrimary from "src/shared/button/ButtonPrimary";
import { useState } from "react";
import Input from "src/shared/Input/Input";
import imgLogin from "src/assets/Illustrasi Login.png";
import Title from "src/shared/Title";
import { AtSymbolIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import ToastError from "src/shared/toast/ToastError";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Login } from "src/model/membership/Login";
import { postLogin } from "src/service/ModuleMembership";

const LoginPage = () => {
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>();

  const onSubmit = (data: Login) => {
    postLogin(data)
      .then((res) => {
        if (res.data.status == 0) {
          localStorage.setItem("token", res.data.data.token);
          navigate("/");
        } else {
        }
      })
      .catch((error) => {
        if (error.response) {
          const res = error.response;
          setMessage(res.data.message);
          setShowMessage(true);
        }
      });
  };

  return (
    <div className="container mx-auto">
      <div className="md:flex justify-center">
        <div className="self-center grid gap-4 p-16 relative ">
          <div className="flex justify-center">
            <Title></Title>
          </div>
          <div className="font-semibold text-center text-2xl flex justify-center">
            <div className="max-w-64">Masuk atau buat akun untuk memulai</div>
          </div>
          <form className="grid gap-4 mt-8 text-xs">
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
                placeholder="masukkan password anda"
                type="password"
                icon={<LockClosedIcon className="h-4" />}
                {...register("password", { required: "Password required" })}
                error={errors.password}
              />
            </div>
          </form>
          <div className="mt-8">
            <ButtonPrimary className="w-full" onClick={handleSubmit(onSubmit)}>
              Masuk
            </ButtonPrimary>
            <div className="md:flex justify-center gap-1 mt-8 text-xs text-gray-500">
              <div className="text-center">belum punya akun? registrasi</div>
              <div className="flex justify-center">
                <Link className="text-red-500" to="/registration">
                  di sini
                </Link>
              </div>
            </div>
          </div>
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

export default LoginPage;
