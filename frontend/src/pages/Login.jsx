import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div
      className="h-screen flex items-center justify-center"
      style={{
        backgroundImage: 'url("/bglog.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="md:w-3/6 lg:w-2/6 bg-blue-950 flex flex-col items-center justify-center rounded-xl p-8">
        <Link to="/" className="text-4xl merriweather-bold text-white">
          PODCASTER
        </Link>
        <div className="mt-6 w-full flex items-center justify-center">
          <div className="w-2/3 flex flex-col items-center">
            <label
              htmlFor="email"
              className="mt-4 lexend-deca-font font-semibold text-2xl text-yellow-200"
            >
              EMAIL
            </label>
            <input
              type="text"
              required
              placeholder="EMAIL"
              name="EMAIL"
              id="email"
              className="mt-2 px-2 py-1 rounded outline-none border-2 border-red-200 w-full"
            />
            <label
              htmlFor="password"
              className="mt-4 lexend-deca-font font-semibold text-2xl text-yellow-200"
            >
              PASSWORD
            </label>
            <input
              type="password"
              required
              placeholder="PASSWORD"
              name="PASSWORD"
              id="password"
              className="mt-2 px-2 py-1 rounded outline-none border-2 border-red-200 w-full"
            />
            <button className="mt-6 px-6 py-1 bg-green-600 font-semibold text-white rounded-full border">
              SignUp
            </button>
            <div className="mt-2 text-white">
              <p>
                Don-t Have an Account ?{" "}
                <Link
                  to="/signup"
                  className="text-green-200 font-semibold hover:text-red-600 hover:font-bold"
                >
                  SignUp
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
