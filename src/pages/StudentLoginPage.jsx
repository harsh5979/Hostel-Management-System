import React from "react";
import LoginForm from "../Components/LoginForm";
import { useAuth } from "../context/contextapi";

const StudentLoginPage = () => {
  const {userStudentdata}=useAuth();
  return (
    <div className="h-[600px] my-5 w-full">
      <div className="  w-[95%] m-auto md:my-12 md:w-[30%] text-black bg-gradient-to-t from-gray-400 to-slate-500 items-center rounded-md md:m-auto my-14 px-8 h-[500px] justify-center flex flex-col">
        <div className="items-center p-2 ">
          <h1 className="text-4xl  text-center font-mono select-none">
            Student Login
          </h1>
          {/* <h3>skhfkajhfjaksf</h3> */}
        </div>
        <LoginForm
          apiurl={"auth/api/student/login"}
          redirect={"/student/dashboard"}
          fetchdata={userStudentdata}
        />
      </div>
    </div>
  );
};

export default StudentLoginPage;
