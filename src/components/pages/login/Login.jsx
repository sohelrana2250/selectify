import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://wallpapers.com/images/hd/yellow-and-blue-background-bqfg6r5bom6fxrvm.jpg')`,
      }}
    >
      <div className="bg-white/80 p-8 rounded-xl shadow-xl w-full max-w-lg backdrop-blur-sm">
        <h1 className="text-center text-3xl font-semibold text-gray-800 mb-6">
          Welcome Back! <span className="text-accent">Login</span>
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent"
              placeholder="Password"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div className="flex justify-between items-center">
            <button type="submit" className="w-full py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-accent">
              Login
            </button>
          </div>

          <p className="text-center  text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-accent hover:underline">
              Create an account
            </Link>
          </p>
        </form>

        <div className="text-center mt-5">
          <p className="text-gray-600">Or Sign Up Using</p>
          <div className="flex justify-center mt-3 space-x-4">
          <button className="btn btn-circle">
              <img
                src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
                
                alt="google logo"
              />
            </button>
            <button className="btn btn-circle">
              <img
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                width={35}
                height={35}
                alt="github logo"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
