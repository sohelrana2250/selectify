import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const ForgetPassword = () => {
  const { ResetPassword } = useContext(AuthContext);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = (data) => {
    ResetPassword(data?.email)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Check Your Email",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(`Error Code: ${errorCode}, Message: ${errorMessage}`);
      });
    reset();
  };

  return (
    <>

    {
        errors && <p className="text-red-500 font-serif text-3xl text-center">{error}</p>
    }
    <div className="min-h-screen flex items-center justify-center bg-gray-50"  style={{
        backgroundImage: `url('https://wallpapers.com/images/hd/yellow-and-blue-background-bqfg6r5bom6fxrvm.jpg')`,
      }}>

        
      <div className="w-full max-w-4xl bg-white/30 shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          {/* Left Image Section */}
          <div
            className="hidden md:block md:w-1/2 bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1123.jpg")',
            }}
          ></div>

          {/* Form Section */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-3xl font-semibold text-gray-800 text-center">
              Forgot Password
            </h2>
            <p className="mt-4 text-gray-600 text-center">
              Enter your email address, and we’ll send you a link to reset your
              password.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="date"
                >
                  Date
                </label>
                <input
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none bg-gray-100"
                  id="date"
                  type="text"
                  defaultValue={new Date().toString().slice(0,25) }
                  readOnly
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm mb-4">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Send Reset Link
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don’t have an account?{" "}
                <a
                  href="/register"
                  className="text-blue-500 hover:underline"
                >
                  Create an account
                </a>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-blue-500 hover:underline"
                >
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ForgetPassword;
