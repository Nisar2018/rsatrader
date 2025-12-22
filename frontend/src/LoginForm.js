import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [Database, setDataBase] = useState("");
  const [UserName, setUserName] = useState("");
  const [Passward, setPassward] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.get("/api/login", {
        params: { UserName, Passward, Database },
      });

      sessionStorage.setItem("isLoggedIn", "true");
      navigate("/MainPage");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <section
        className="w-full max-w-sm bg-blue-100 rounded-2xl shadow-lg p-6 sm:p-8"
        aria-label="Login Form"
      >
        {/* Heading */}
        <h1 className="text-center text-2xl sm:text-3xl font-bold text-gray-800 p-5">
          Login
        </h1>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Database */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-6">
             
            {/*  Database */}
            </label>
            <input
              type="text"
              value={Database}
              onChange={(e) => setDataBase(e.target.value)}
              placeholder="Please Enter Database"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm sm:text-base
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
           {/*    Username */}
            </label>
            <input
              type="text"
              value={UserName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Please Enter User Name"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm sm:text-base
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
            {/*  Password */}
            </label>
            <input
              type="password"
              value={Passward}
              onChange={(e) => setPassward(e.target.value)}
              placeholder="Please Enter Password"
              required
              className="w-full rounded-lg border border-gray-300 px-6 py-2 text-sm sm:text-base
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white
                       font-semibold py-2.5 rounded-lg transition duration-200
                       text-sm sm:text-base "
          >
            Login
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <p className="mt-4 text-sm text-center text-red-600" role="alert">
            {error}
          </p>
        )}
      </section>
    </main>
  );
};

export default LoginForm;
