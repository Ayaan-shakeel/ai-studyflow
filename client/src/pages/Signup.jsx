import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { AuthCard } from '../components/AuthCard';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

export default function Signup() {
  const [show, setShow] = useState(false);
  const [formData, setformData] = useState({
    username: "",
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
      if(!formData.username || !formData.email || !formData.password){
        toast.error("Please fill all the fields");
        return;
      }
      if(formData.password.length < 8){
        toast.error("Password must be at least 8 characters");
        return;
      }
      if(!formData.email.includes("@")){
        toast.error("Invalid email");
        return;
      }
      
      const response = await axios.post(  `${import.meta.env.VITE_API_URL}/api/auth/register`, formData, {
        withCredentials: true
      });
      toast.success("SignUp Successful");
      window.location.href = "/dashboard";
      // console.log(response.data);
    } catch (error) {
      toast.error("SignUp Failed");
      console.log(error.message);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <AuthCard>
        <div>
          <h1 className="text-2xl font-bold text-center mb-2">Welcome to our app</h1>
          <h2 className="text-base font-semibold text-center mb-6 text-slate-600">
            Please Sign Up
          </h2>

          <form className="flex items-center flex-col justify-center gap-4" onSubmit={handleSubmit}>
            <input
              className="border border-slate-300 w-full p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-200"
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
            />

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
              className="bg-blue-500 text-white py-3 px-4 w-full rounded-xl hover:bg-blue-600 cursor-pointer font-medium transition"
              type="submit"
            >
              Sign up
            </button>

            <p
              onClick={() => navigate("/login")}
              className="text-blue-500 hover:text-blue-700 font-medium mt-2 cursor-pointer"
            >
              Already have an account
            </p>
          </form>
        </div>
      </AuthCard>
    </>
  );
}