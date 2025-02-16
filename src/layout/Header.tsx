import { MenuOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "src/shared/button/Button";
import Title from "src/shared/Title";

const Header = () => {
  const [pathname, setPathname] = useState("");
  const location = useLocation();

  const [show, setShow] = useState(false);

  const toggle = () => {
    setShow((val) => !val);
  };

  useEffect(() => {
    setPathname(location.pathname);
    setShow(false);
  }, [location]);

  return (
    <div className="border-b border-gray-300 py-2">
      <div className="container mx-auto flex justify-between md:px-12 lg:px-32 px-4">
        <Title />
        <div className="md:flex gap-4 hidden">
          <Button
            className="hover:bg-red-500 hover:text-white"
            href="/topup"
            selected={pathname == "/topup"}
          >
            Top Up
          </Button>
          <Button
            className="hover:bg-red-500 hover:text-white"
            href="/transaction"
            selected={pathname == "/transaction"}
          >
            Transaction
          </Button>
          <Button
            className="hover:bg-red-500 hover:text-white"
            href="/profile"
            selected={pathname == "/profile"}
          >
            Akun
          </Button>
        </div>
        <div className="block md:hidden">
          <Button className="border border-gray-400" onClick={toggle}>
            <MenuOutlined />
          </Button>
        </div>
        <div
          className={`fixed h-screen w-screen top-0 left-0 z-40 ${
            show ? "" : "hidden"
          }`}
        >
          <div className="bg-black opacity-20 h-screen w-screen fixed z-40"></div>
          <div className="flex flex-col gap-4 bg-white fixed w-full z-50 px-4 py-2">
            <div className="flex justify-end">
              <Button className="border border-gray-400" onClick={toggle}>
                <MenuOutlined />
              </Button>
            </div>
            <Button
              className="hover:bg-red-500 hover:text-white justify-end"
              href="/topup"
              selected={pathname == "/topup"}
            >
              Top Up
            </Button>
            <Button
              className="hover:bg-red-500 hover:text-white justify-end"
              href="/transaction"
              selected={pathname == "/transaction"}
            >
              Transaction
            </Button>
            <Button
              className="hover:bg-red-500 hover:text-white justify-end"
              href="/profile"
              selected={pathname == "/profile"}
            >
              Akun
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
