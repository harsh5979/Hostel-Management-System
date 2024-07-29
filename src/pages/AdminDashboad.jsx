import React, { useEffect, useState } from "react";
import Humbar from "../Components/Humbar";
import AllStudentApi from "../api/AllStudentApi";
import { useAuth } from "../context/contextapi";
import { NavLink } from "react-router-dom";

const AdminDashboard = () => {
  const { fetchStudent, islogin,dashboard } = useAuth();
  useEffect(() => {
    dashboard();
    fetchStudent();
  }, []);

  return (
    <div>
      <Humbar name={"Admin Dashboard"} />

      <div className=" text-3xl mx-8 my-4">Student List :</div>

      {islogin ? (
        <div className="  p-8 h-screen md:w-full  items-center">
          <table className="justify-center m-auto  overflow-hidden border-transparent bg-white text-black">
            <thead className="bg-gray-600">
              <tr>
                <th className="border p-2 px-2 text-xl w-[280px]">Full Name</th>
                <th className="border p-2 px-3 text-xl w-[35px]">Room number</th>
                <th className="border p-2 px-3 text-xl w-[60px]">Batch</th>
                <th className="border p-2 px-3 text-xl w-[170px]">mobile</th>
                <th className="border p-2 px-3 text-xl w-[250px]">
                  Pending Months Count
                </th>
                <th className="border p-2 px-3 text-xl w-[250px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AllStudentApi />
            </tbody>
          </table>
        </div>
      ) : (
        <div className="left-1/2 absolute  top-1/2 text-4xl  flex">
          <h1 className=" text-center text-red-600 mr-2 ">First login!!!</h1>
          <NavLink to="/adminlogin" className={"removeLinkHover underline"}>
            click me
          </NavLink>
        </div>
      )}
    
    </div>
  );
};

export default AdminDashboard;
