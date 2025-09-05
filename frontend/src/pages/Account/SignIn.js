import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    let emailError = "";
    let passwordError = "";

    if (!email) {
      emailError = "Please enter your email";
    }
    if (!password) {
      passwordError = "Please enter your password";
    }

    setErrEmail(emailError);
    setErrPassword(passwordError);

    if (email && password) {
      setSuccessMsg("Sign in successful! Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
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

          {successMsg && (
            <p className="p-3 bg-green-100 text-green-700 rounded-md text-center">{successMsg}</p>
          )}

          <div>
            <label className="text-sm font-medium text-gray-700">Email Address</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full mt-2 h-10 px-4 text-base rounded-md border border-gray-300 outline-none focus:border-primeColor"
              type="email"
              placeholder="john@example.com"
            />
            {errEmail && <p className="text-sm text-red-500 mt-1">{errEmail}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full mt-2 h-10 px-4 text-base rounded-md border border-gray-300 outline-none focus:border-primeColor"
              type="password"
              placeholder="Enter your password"
            />
            {errPassword && <p className="text-sm text-red-500 mt-1">{errPassword}</p>}
          </div>

          <button
            type="submit"
            className="bg-primeColor hover:bg-black text-white w-full text-base font-medium h-12 rounded-md duration-300"
          >
            Sign In
          </button>

          <p className="text-sm text-center text-gray-600">
            Don't have an Account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;