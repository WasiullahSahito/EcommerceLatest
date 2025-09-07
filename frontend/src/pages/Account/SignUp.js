import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [clientName, setClientName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [errClientName, setErrClientName] = useState('');
  const [errEmail, setErrEmail] = useState('');
  const [errPassword, setErrPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    if (checked) {
      if (clientName && email && password && password.length >= 6) {
        navigate('/signin');
      } else {
        if (!clientName) setErrClientName('Enter your name');
        if (!email) setErrEmail('Enter your email');
        if (!password) {
          setErrPassword('Create a password');
        } else if (password.length < 6) {
          setErrPassword('Passwords must be at least 6 characters');
        }
      }
    }
  };

  return (
    // This wrapper adds vertical space and centers the form within the page layout
    <div className="bg-gray-50 py-20">
      <div className="w-full max-w-sm mx-auto bg-white rounded-lg shadow-lg p-8">
        <form onSubmit={handleSignUp} className="flex flex-col gap-5">
          <div className="flex justify-center mb-4">
            <img
              src="https://serviceapi.spicezgold.com/download/1750047766437_logo.jpg"
              alt="Logo"
              className="w-36"
            />
          </div>
          <h1 className="text-center font-bold text-xl text-gray-800">
            Create a New Account
          </h1>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              onChange={(e) => setClientName(e.target.value)}
              value={clientName}
              className="w-full h-11 px-4 text-base rounded-md border border-gray-300 outline-none focus:border-primeColor transition"
              type="text"
              placeholder="John Doe"
            />
            {errClientName && (
              <p className="text-xs text-red-500 mt-1">{errClientName}</p>
            )}
          </div>

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
              placeholder="Create a password"
            />
            {errPassword && (
              <p className="text-xs text-red-500 mt-1">{errPassword}</p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <input
              onChange={() => setChecked(!checked)}
              className="w-4 h-4 cursor-pointer"
              type="checkbox"
              id="terms"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the{' '}
              <Link to="#" className="text-blue-600 hover:underline">
                Terms of Service
              </Link>
            </label>
          </div>

          <button
            type="submit"
            className={`${checked
                ? 'bg-primeColor hover:bg-black cursor-pointer'
                : 'bg-gray-400 cursor-not-allowed'
              } w-full text-white text-base font-medium h-12 rounded-md duration-300`}
          >
            Create Account
          </button>

          <p className="text-sm text-center text-gray-600">
            Already have an Account?{' '}
            <Link
              to="/signin"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;