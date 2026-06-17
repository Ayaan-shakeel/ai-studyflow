import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { AuthCard } from '../components/AuthCard';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [show, setShow] = useState(false);
  const [formData, setformData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setformData({ ...formData, [inputName]: inputValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(  `${import.meta.env.VITE_API_URL}/api/auth/login`, formData, {
        withCredentials: true
      });
      toast.success("Login Successful");
      window.location.href = "/dashboard";
      // console.log(response.data);
    } catch (error) {
      toast.error("Login Failed");
      console.log(error.message);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <AuthCard>
        <div>
          <h1 className="text-2xl text-center font-bold mb-2">Welcome Back</h1>
          <h3 className="text-base text-center font-semibold mb-6 text-slate-600">
            Login
          </h3>

          <form className="flex flex-col items-center justify-center gap-4" onSubmit={handleSubmit}>
            <input
              className="border border-slate-300 w-full p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-200"
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />

            <div className="relative w-full">
              <input
                className="border border-slate-300 w-full p-3 pr-12 rounded-xl outline-none focus:ring-2 focus:ring-blue-200"
                type={show ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                aria-label={show ? "Hide password" : "Show password"}
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              className="bg-blue-500 text-white py-3 px-4 w-full cursor-pointer rounded-xl hover:bg-blue-600 font-medium transition"
              type="submit"
            >
              Login
            </button>

            <p
              onClick={() => navigate("/signup")}
              className="text-blue-500 hover:text-blue-700 font-medium mt-2 cursor-pointer"
            >
              Create a new account
            </p>
          </form>
        </div>
      </AuthCard>
    </>
  );
}