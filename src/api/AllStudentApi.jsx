import React, { useEffect, useState } from "react";
import { useAuth } from "../context/contextapi";
// import { FaEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ViewStudent from "../Components/ViewStudent";
import { useNavigate } from "react-router-dom";

const AllStudentApi = () => {
  const { deleteStudent, studentView, dashboard } = useAuth();
  const navigate = useNavigate();

//   useEffect(() => {
//     //   fetchStudent();
//   }, []);
    const { fetchUser, deleteUser } = useAuth();
  const handaleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (isConfirmed) {
      await deleteStudent(id);
      await dashboard();
    }
  };

  const handaleView = async (id) => {
    try {
      // await viewStudent(id);
      navigate(`/admin/view-student/${id}`);
    } catch (error) {
      console.error("Error viewing student:", error);
    }
  };

  return (
    <>
      {studentView ? (
          studentView.map((e, i) => {
              return (
              <tr className="border  " key={i}>
              {/* <td className="tbd">{i + 1}</td> */}
              <td className="tbd">{e.fullName}</td>
              <td className="tbd">{e.roomNumber}</td>
              <td className="tbd">{e.batch}</td>
              <td className="tbd">{e.mobileNumber}</td>
              <td className="tbd">{e.pendingMonthCount}</td>
              <td className="tbd">
                <div className="flex mx-5 gap-5">
                  <button className="px-2" onClick={() => handaleView(e._id)}>
                    {/* <FaEdit size={25}/> */}
                    <FaEye size={25} />
                  </button>
                  <button className="px-2" onClick={() => handaleDelete(e._id)}>
                    <div className=" flex border border-[#90CAF9] p-2 ">
                      <MdDelete size={25} color="#90CAF9" />
                      <h1 className="mx-2 text-[#90CAF9]">Delete</h1>
                    </div>
                  </button>
                </div>
              </td>
            </tr>
          

          );
        })
      ) : (
        <tr>
            

        <td className="text-black text-3xl ">no data found</td>
        </tr>
      )}
    </>
  );
};

export default AllStudentApi;
