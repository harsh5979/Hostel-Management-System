import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';

const AdminLogin = () => {
  const url = "http://localhost:3000";

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    try {
      const response = await axios.post(`${url}/admin/login`, {
        username,
        password,
      });

      const result =  response.data;
      console.log(result)

      if (response.status === 200) { // Use response.status to check the HTTP status code
        toast.success("Login successful");
        navigate('/dashboard');
      } else {
        toast.error(result.error || 'An error occurred');
      }
    } catch (error) {
      console.error('Client-side error:', error.response ? error.response.data : error.message);
      toast.error(`An error occurred: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="max-w-sm mx-auto mt-8">
        <div className="mb-6">
          <input
            autoFocus
            type="text"
            placeholder="Email or Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="placeholder:text-slate-800 bg-transparent block text-black w-full px-4 py-2 border-4 rounded-b-lg focus:outline-none focus:border-gray-300 border-gray-600/40"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="placeholder:text-slate-800 text-black bg-transparent block w-full px-4 py-2 my-2 border-4 rounded-b-lg focus:outline-none focus:border-gray-300 border-gray-600/40"
          />
          <div className="mb-3 relative top-0">
            <h3 className="text-right">
              <NavLink
                to="/forgotpassword"
                className="removeLinkHover text-blue-600 hover:text-blue-800"
              >
                Forgot password?
              </NavLink>
            </h3>
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      <div>
        <h3 className="my-3 text-center">
          Don't have an account?{' '}
          <NavLink
            className="removeLinkHover text-blue-600 hover:text-blue-800"
            to="/signup"
          >
            Signup!
          </NavLink>
        </h3>
      </div>
    </div>
  );
};

export default AdminLogin;
