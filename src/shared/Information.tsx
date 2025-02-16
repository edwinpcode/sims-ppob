import { useEffect, useState } from "react";
import imgSaldo from "src/assets/Background Saldo.png";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { getBalance } from "src/service/ModuleTransaction";
import { useDispatch, useSelector } from "react-redux";
import { setBalance } from "src/store/balanceSlice";
import { RootState } from "src/store/store";
import { getProfile } from "src/service/ModuleMembership";
import { setProfileData } from "src/store/profileSlice";

const Information = () => {
  const [show, setShow] = useState(false);
  const balance = useSelector((state: RootState) => state.balance.value);
  const profile = useSelector((state: RootState) => state.profile);

  const masked = "•••";

  const dispatch = useDispatch();

  const onButtonClick = () => {
    setShow((val) => !val);
  };

  const getData = () => {
    getBalance().then((res) => {
      if (res.data.status == 0) {
        const data = res.data.data;
        dispatch(setBalance(data.balance));
      }
    });
  };

  const getDataProfile = () => {
    getProfile()
      .then((res) => {
        if (res.data.status == 0) {
          dispatch(setProfileData(res.data.data));
        }
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {});
  };

  useEffect(() => {
    getDataProfile();
    getData();
  }, []);

  return (
    <div className="md:flex justify-between">
      <div className="grow">
        <div className="flex">
          <div className="border border-gray-200 rounded-full">
            <img
              src={
                profile.profile_image == "" ? undefined : profile.profile_image
              }
              alt="Profile img"
              className="border h-16 w-16 rounded-full"
            ></img>
          </div>
        </div>
        <div className="text-gray-500 mt-2">Selamat datang,</div>
        <div className="font-semibold text-xl">
          {profile.first_name} {profile.last_name}
        </div>
      </div>
      <div className={`relative grow mt-2 md:mt-0`}>
        <img
          src={imgSaldo}
          className="absolute inset-0 h-full md:w-full -z-10"
        />
        <div className="p-4 text-white">
          <div className="text-sm">Saldo Anda</div>
          <div className="flex gap-2 font-bold text-2xl mt-2">
            <div>Rp</div>
            <div>{show ? `${balance}` : masked}</div>
          </div>
          <div className="mt-4 text-sm flex gap-2">
            <div>Lihat Saldo</div>
            <button
              onClick={onButtonClick}
              className="text-white w-4"
              type="button"
            >
              {show ? <EyeIcon /> : <EyeSlashIcon />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
