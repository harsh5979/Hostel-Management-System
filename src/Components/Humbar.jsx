import React from "react";
import { useAuth } from "../context/contextapi";
import { NavLink } from "react-router-dom";

const Humbar = ({ name }) => {
  const { islogin } = useAuth();
  return (
    <div className="flex  ">
      <div className="   border   md:w-[83vw] w-screen h-16 my-2 flex justify-center bg-black ">
        <h1 className="text-3xl text-center items-center m-auto px-5 w-auto">
          {name}
        </h1>
        {/* login and logout */}
      </div>
    </div>
  );
};

export default Humbar;
