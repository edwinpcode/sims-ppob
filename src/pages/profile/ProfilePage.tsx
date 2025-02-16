import { ChangeEvent, useEffect, useState } from "react";
import ButtonPrimary from "src/shared/button/ButtonPrimary";
import Input from "src/shared/Input/Input";
import Modal from "src/shared/modal/Modal";
import ButtonSecondary from "src/shared/button/ButtonSecondary";
import { useForm } from "react-hook-form";
import { AtSymbolIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/outline";
import {
  getProfile,
  putProfile,
  putProfileImage,
} from "src/service/ModuleMembership";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store/store";
import { Profile } from "src/model/membership/Profile";
import { setProfileData } from "src/store/profileSlice";
import { setLoading } from "src/store/loadingSlice";
import { Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [disable, setDisable] = useState(true);

  const { register, handleSubmit, reset } = useForm<Profile>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profile = useSelector((state: RootState) => state.profile);

  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = (data: Profile) => {
    toggleDisable();
    dispatch(setLoading(true));
    putProfile(data)
      .then((res) => {
        if (res.data.status == 0) {
          dispatch(setProfileData(res.data.data));
          reset(res.data.data);
          setMessage(res.data.message);
          setShowModal(true);
        }
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const toggleDisable = () => {
    setDisable((val) => !val);
  };

  const getData = () => {
    getProfile()
      .then((res) => {
        if (res.data.status == 0) {
          dispatch(setProfileData(res.data.data));
          reset(res.data.data);
        }
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {});
  };

  const UploadFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const formData = new FormData();
    console.log(file);
    if (!file) {
    } else {
      formData.append("file", file);
      putProfileImage(formData).then((res) => {
        if (res.data.status == 0) {
          dispatch(setProfileData(res.data.data));
          reset(res.data.data);
          setMessage(res.data.message);
          setShowModal(true);
        }
      });
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="relative container mx-auto pt-4">
      {/* <Modal /> */}
      {showModal && (
        <Modal onClick={() => setShowModal(false)}>{message}</Modal>
      )}
      <div className="flex justify-center relative">
        <div className="relative">
          <img
            src={profile.profile_image}
            className="h-12 w-12 border rounded-full"
          ></img>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="uploadFile"
            onChange={UploadFile}
          />
          <label
            htmlFor="uploadFile"
            className="flex justify-center items-center absolute right-0 bottom-0"
          >
            <Edit
              className="border  border-gray-500 rounded-full p-1 bg-white"
              fontSize="small"
            />
          </label>
        </div>
      </div>
      <div className="flex justify-center pt-4">
        <div className="font-semibold text-xl">
          {profile.first_name} {profile.last_name}
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="pt-4">
          <label className="font-semibold">Email</label>
          <Input
            label="Email"
            className="mt-2"
            disabled={disable}
            icon={<AtSymbolIcon className="h-4" />}
            {...register("email", { required: "email required" })}
          />
        </div>
        <div className="pt-4">
          <label className="font-semibold">Nama Depan</label>
          <Input
            label="Email"
            className="mt-2"
            disabled={disable}
            icon={<UserIcon className="h-4" />}
            {...register("first_name", { required: "first name required" })}
          />
        </div>
        <div className="pt-4">
          <label className="font-semibold">Nama Belakang</label>
          <Input
            label="Email"
            className="mt-2"
            disabled={disable}
            icon={<UserIcon className="h-4" />}
            {...register("last_name", { required: "last name required" })}
          />
        </div>
        {disable && (
          <div>
            <ButtonPrimary
              className="w-full mt-4"
              onClick={toggleDisable}
              type="button"
            >
              Edit Profile
            </ButtonPrimary>
            <ButtonSecondary className="w-full mt-4" onClick={logout}>
              Logout
            </ButtonSecondary>
          </div>
        )}
        {!disable && (
          <div>
            <ButtonSecondary className="w-full mt-4" type="submit">
              Simpan
            </ButtonSecondary>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfilePage;
