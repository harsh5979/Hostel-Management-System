import React from "react";
import { AiOutlineMenu, AiFillHome } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { TbReceiptRupee } from "react-icons/tb";
import { MdDownloading } from "react-icons/md";



import { NavLink } from "react-router-dom";
import { useAuth } from "../context/contextapi";

const Sidebar = () => {
  const{downloadallstudents,downloadbasicstudents}=useAuth();
  const Service = [
    {
      name: "Dashboad",
      link: "/admin/dashboard",
      logo: <AiFillHome size={25} />,
    },
    {
      name: "Add Student",
      link: "/admin/addstudent",
      logo: <IoMdAdd size={25} />,
    },
    {
      name: "Add Monthly Fees",
      link: "/admin/add-monthly-fees",
      logo: <TbReceiptRupee  size={25}/>,

    },
    {
      name: "Download Student Details ",
      link: "#",
      logo: <MdDownloading  size={25}/>
      ,
      onClick:downloadallstudents,
    },
    {
      name: "Download Blank Student Details",
      link: "#",
      logo: <MdDownloading  size={25}/>,
      onClick:downloadbasicstudents,

    },
  ];
  return (
    <div className="sidebar">
      <div className="w-[16vw]  p-3 mx-1 my-2 bg-[#1f273e]  rounded-lg h-auto border ">
        <div className=" flex justify-between my-5 md:text-2xl ">
          <h1>Admin </h1>
          <AiOutlineMenu />
        </div>
        <div className="my-20">
          {Service.map((e) => {
            return (
              <div key={e.name}>
                <div className="flex my-8 mx-2 ">
                    <div className="mx-2 my-auto text-left ">{e.logo}</div>

                    {e.onClick ? (
                      // <NavLink>

                    <button
                      onClick={e.onClick}
                      className="text-xl mx-2 my-4 mb-4 text-[#959393bd] bg-transparent border-none"
                      >
                      {e.name}
                    </button>
                      // </NavLink>
                  ) : (
                    <NavLink
                      to={e.link}
                      className={(navData) =>
                        navData.isActive
                          ? "text-white after:w-[100%] after:bg-[#73a6e1]"
                          : ""
                      }
                    >
                      <h1 className={"text-xl mx-2"}>{e.name}</h1>
                    </NavLink>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
