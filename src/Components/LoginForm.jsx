import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CiCircleInfo } from "react-icons/ci";
import { NavLink } from "react-router-dom";
// import Signup from "../pages/Signup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/contextapi";
const LoginForm = ({apiurl,redirect ,fetchdata}) => {
  const { storeToken, url } = useAuth();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  // const [fetchCalled, setFetchCalled] = useState(false);


  const onsubmit = async (data) => {
    const r = await fetch(`${url}/${apiurl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await r.json();
    // console.log(res);
    if (r.ok) {
      // console.log(res.authtoken)
     await storeToken(res.authtoken);
    //  if (!fetchCalled) {
    //   await fetchdata();
    //   setFetchCalled(true);
    // }
      // await userdata(res.authtoken,fd);
      // const ta= await localStorage.setItem("token", res.authtoken);
      navigate(redirect);
      toast.success(res.message);
    } else {
      toast.error(res.error ? res.error : res);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onsubmit)}
        id="paintingForm"
        className="max-w-sm mx-auto mt-8"
      >
        <div className="mb-6 ">
          <input
          autoFocus
            type="text"
            placeholder="Email or Username"
            name="username"
            {...register("username", {
              required: { value: true, message: "Enter valid username!!" },
            //   pattern: {
            //     value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            //     message: "Enter a valid email address.",
            //   },
            })}
            className="placeholder:text-slate-800 bg-transparent block w-full px-4 py-2   border-4  rounded-b-lg focus:outline-none focus:border-gray-300 border-gray-600/40 "
          />
          {errors.username && (
            <div className="text-red-800 text-left text-xs flex py-1  ">
              <div className="mx-1 py-1">
                <CiCircleInfo />
              </div>
              {errors.username.message}
            </div>
          )}
        </div>
        <div className="">
          <input
            type="text"
            placeholder="Password"
            name="password"
            {...register("password", {
              required: { value: true, message: "Enter Password!" },
              minLength: {
                value: 1,
                message: "enter password at least 4 digit",
              },
            })}
            className="placeholder:text-slate-800 bg-transparent  block w-full px-4 py-2 my-2 border-4  rounded-b-lg focus:outline-none focus:border-gray-300 border-gray-600/40 "
          />
          {errors.password && (
            <div className="text-red-800 text-left text-xs flex py-1 ">
              <div className="mx-1 py-1">
                <CiCircleInfo />
              </div>
              {errors.password.message}
            </div>
          )}
          <div className="mb-3 relative top-0 ">
            <h3 className="text-right ">
              {" "}
              <NavLink
                to="/forgotpassword"
                className={"removeLinkHover text-blue-600 hover:text-blue-800 "}
              >
                forgot password?
              </NavLink>
            </h3>
          </div>
        </div>

        <button
          value="submit"
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 "
        >
          Login
        </button>
      </form>
      <div className="">
        <h3 className="my-3 text-center">
          Don't have an account?{" "}
          <NavLink
            className={"removeLinkHover text-blue-600 hover:text-blue-800 "}
            to="/signup"
            
          >
            Signup!
          </NavLink>{" "}
        </h3>
      </div>
    </div>
  );
};

export default LoginForm;
