import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errEmail, setErrEmail] = useState('');
  const [errPassword, setErrPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    setErrEmail('');
    setErrPassword('');
    if (!email) {
      setErrEmail('Please enter your email');
    }
    if (!password) {
      setErrPassword('Please enter your password');
    }
    if (email && password) {
      navigate('/');
    }
  };

  return (
    // This wrapper adds vertical space and centers the form within the page layout
    <div className="bg-gray-50 py-20">
      <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg p-8">
        <form onSubmit={handleSignIn} className="flex flex-col gap-5">
          <div className="flex justify-center mb-4">
            <img
              src="https://serviceapi.spicezgold.com/download/1750047766437_logo.jpg"
              alt="Logo"
              className="w-36"
            />
          </div>
          <h1 className="text-center font-bold text-xl text-gray-800">
            Sign in to your account
          </h1>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full h-11 px-4 text-base rounded-md border border-gray-300 outline-none focus:border-primeColor transition"
              type="email"
              placeholder="john@example.com"
            />
            {errEmail && (
              <p className="text-xs text-red-500 mt-1">{errEmail}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full h-11 px-4 text-base rounded-md border border-gray-300 outline-none focus:border-primeColor transition"
              type="password"
              placeholder="Enter your password"
            />
            {errPassword && (
              <p className="text-xs text-red-500 mt-1">{errPassword}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-primeColor hover:bg-black text-white w-full text-base font-medium h-12 rounded-md duration-300"
          >
            Sign In
          </button>

          <p className="text-sm text-center text-gray-600">
            Don't have an Account?{' '}
            <Link
              to="/signup"
              className="text-blue-600 hover:underline font-medium"
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