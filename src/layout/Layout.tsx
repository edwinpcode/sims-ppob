import { FC, HTMLAttributes } from "react";
import Header from "./Header";

interface Props extends HTMLAttributes<HTMLDivElement> {}

const Layout: FC<Props> = ({ children, ...args }) => {
  return (
    <div className="h-screen relative flex flex-col" {...args}>
      <Header />
      <div className="flex-1 overflow-y-auto relative">
        <div className="container mx-auto md:px-12 lg:px-32 px-4">
          {children}
        </div>
      </div>
      {/* {show && <Footer />} */}
    </div>
  );
};

export default Layout;
