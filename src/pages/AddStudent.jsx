import React, { useState } from "react";
import { useAuth } from "../context/contextapi";
import Humbar from "../Components/Humbar";

const AddStudent = () => {
  const { addStudent, dashboard } = useAuth();

  const initialState = {
    email: "",
    fullName: "",
    roomNumber: "",
    branch: "",
    batch: "",
    gender: "",
    mobileNumber: "",
    enrollmentNumber: "",
    username: "",
    password: "",
  };
  const [data, setData] = useState(initialState);

  const handleInput = async (e) => {
    await setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    await addStudent(data);
    dashboard();
    setData(initialState);
  };

  return (
    <>
      <div className="flex  items-center w-full  flex-wrap ">
        <div
          className="" >
          <Humbar name={"Add Student"} />
        </div>
        <div className="w-full  p-8 shadow-md rounded-md ">
          {/* <h1 className="text-2xl font-bold mb-6 text-center"></h1> */}
          <form
            onSubmit={handleSubmit}
            className="md:grid grid-cols-3 md:gap-5 {  flex flex-wrap gap-5} "
          >
            <div className="mb-4  ">
              <label htmlFor="username" className="lable">
                Username:
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={data.username}
                onChange={handleInput}
                required
                className="w-full   px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="lable">
                Password:
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required
                value={data.password}
                onChange={handleInput}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="lable">
                Email:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={data.email}
                onChange={handleInput}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="fullName" className="lable">
                Full Name:
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                required
                value={data.fullName}
                onChange={handleInput}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="roomNumber" className="lable">
                Room Number:
              </label>
              <input
                type="text"
                name="roomNumber"
                id="roomNumber"
                required
                value={data.roomNumber}
                onChange={handleInput}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="branch" className="lable">
                Branch:
              </label>
              <input
                type="text"
                name="branch"
                id="branch"
                required
                value={data.branch}
                onChange={handleInput}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="batch" className="lable">
                Batch:
              </label>
              <input
                type="text"
                name="batch"
                id="batch"
                required
                value={data.batch}
                onChange={handleInput}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="gender" className="lable">
                Gender:
              </label>
              <input
                type="text"
                name="gender"
                id="gender"
                required
                value={data.gender}
                onChange={handleInput}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="mobileNumber" className="lable">
                Mobile Number:
              </label>
              <input
                type="text"
                name="mobileNumber"
                id="mobileNumber"
                required
                value={data.mobileNumber}
                onChange={handleInput}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="enrollmentNumber" className="lable">
                Enrollment Number:
              </label>
              <input
                type="number"
                name="enrollmentNumber"
                id="enrollmentNumber"
                required
                value={data.enrollmentNumber}
                onChange={handleInput}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="my-8">
              <button
                type="submit"
                className="w-60 h-14 py-2 px-4  mx-14 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddStudent;
