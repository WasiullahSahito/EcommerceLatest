import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    if (checked) {
      let nameError = "";
      let emailError = "";
      let passwordError = "";

      if (!clientName) nameError = "Enter your name";
      if (!email) emailError = "Enter your email";
      if (!password) {
        passwordError = "Create a password";
      } else if (password.length < 6) {
        passwordError = "Passwords must be at least 6 characters";
      }

      setErrClientName(nameError);
      setErrEmail(emailError);
      setErrPassword(passwordError);

      if (clientName && email && password && password.length >= 6) {
        setSuccessMsg(`Welcome, ${clientName}! Your account has been created.`);
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      }
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <form onSubmit={handleSignUp} className="flex flex-col gap-6">
          <Link to="/" className="flex justify-center mb-4">
            <img
              src="https://serviceapi.spicezgold.com/download/1750047766437_logo.jpg"
              alt="Logo"
              className="w-36"
            />
          </Link>
          <h1 className="text-center font-bold text-2xl text-gray-800">
            Create a New Account
          </h1>

          {successMsg && (
            <p className="p-3 bg-green-100 text-green-700 rounded-md text-center">{successMsg}</p>
          )}

          <div>
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              onChange={(e) => setClientName(e.target.value)}
              value={clientName}
              className="w-full mt-2 h-10 px-4 text-base rounded-md border border-gray-300 outline-none focus:border-primeColor"
              type="text"
              placeholder="John Doe"
            />
            {errClientName && <p className="text-sm text-red-500 mt-1">{errClientName}</p>}
          </div>

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
              placeholder="Create a password"
            />
            {errPassword && <p className="text-sm text-red-500 mt-1">{errPassword}</p>}
          </div>

          <div className="flex items-center gap-2">
            <input
              onChange={() => setChecked(!checked)}
              className="w-4 h-4 cursor-pointer"
              type="checkbox"
            />
            <p className="text-sm text-gray-600">
              I agree to the <span className="text-blue-600">Terms of Service</span> and{" "}
              <span className="text-blue-600">Privacy Policy</span>.
            </p>
          </div>

          <button
            type="submit"
            className={`${checked
                ? "bg-primeColor hover:bg-black cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
              } w-full text-white text-base font-medium h-12 rounded-md duration-300`}
          >
            Create Account
          </button>

          <p className="text-sm text-center text-gray-600">
            Already have an Account?{" "}
            <Link to="/signin" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;