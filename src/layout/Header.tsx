import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "src/shared/button/Button";
import Title from "src/shared/Title";

const Header = () => {
  const [pathname, setPathname] = useState("");
  const location = useLocation();

  useEffect(() => {
    setPathname(location.pathname);
  }, [location]);

  return (
    <div className="border-b border-gray-300 py-2">
      <div className="container mx-auto flex justify-between md:px-12 lg:px-32 px-4">
        <Title />
        <div className="flex gap-4">
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
      </div>
    </div>
  );
};

export default Header;
