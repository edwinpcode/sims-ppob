import { HTMLAttributes } from "react";
import LoopIcon from "@mui/icons-material/Loop";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";

interface Props extends HTMLAttributes<HTMLDivElement> {}

const Loading = ({ ...args }: Props) => {
  const loading = useSelector((state: RootState) => state.loading.isLoading);
  return (
    <div className={`fixed z-50 ${loading ? "" : "hidden"}`}>
      <div className="bg-black top-0 left-0 fixed  h-screen w-screen opacity-20"></div>
      <div className="flex justify-center items-center h-screen w-screen">
        <div className={`rounded-md py-8 px-16`} {...args}>
          <div className="flex flex-col">
            <LoopIcon
              className="text-gray-500 text-9xl h-80 w-80 animate-spin"
              sx={{ fontSize: 98 }}
            ></LoopIcon>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
