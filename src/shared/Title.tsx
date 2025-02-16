import React from "react";
import { Link } from "react-router-dom";
import imgLogo from "src/assets/Logo.png";

const Title = () => {
  return (
    <Link className="flex gap-4 items-center cursor-pointer" to="/">
      <img src={imgLogo}></img>
      <div className="font-semibold">SIMS PPOB - Edwin Pangda</div>
    </Link>
  );
};

export default Title;
