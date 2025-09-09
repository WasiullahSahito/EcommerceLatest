import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/orebiSlice";
import toast from "react-hot-toast";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Please fill in all fields");
    }
    setLoading(true);
    try {
      // API call to the backend login route
      const { data } = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // Dispatch the action to save user info in Redux state and localStorage
      dispatch(loginUser(data));
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Invalid email or password.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex-grow flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <form onSubmit={handleSignIn} className="flex flex-col gap-6">
          <Link to="/" className="flex justify-center mb-4">
            <img
              src="https://serviceapi.spicezgold.com/download/1750047766437_logo.jpg"
              alt="Logo"
              className="w-36"
            />
          </Link>
          <h1 className="text-center font-bold text-2xl text-gray-800">
            Sign in to your account
          </h1>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full h-12 px-4 text-base rounded-md border border-gray-300 outline-none focus:border-primeColor"
              type="email"
              placeholder="john@example.com"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full h-12 px-4 text-base rounded-md border border-gray-300 outline-none focus:border-primeColor"
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-primeColor hover:bg-black text-white w-full text-base font-medium h-12 rounded-md duration-300 flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
          <p className="text-sm text-center text-gray-600">
            Don't have an Account?{" "}
            <Link
              to="/signup"
              className="text-primeColor hover:underline font-medium"
            >
              Sign up here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;